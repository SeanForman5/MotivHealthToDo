import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToDoListPage } from './todo-list.page';
import { ToDoService } from 'src/app/services/todo.service';
import { ToDo } from 'src/app/models/domain/todo';
import { of } from 'rxjs';
import { SortField } from 'src/app/models/enum/sort-field';

describe('ToDoListPage', () => {
  let component: ToDoListPage;
  let fixture: ComponentFixture<ToDoListPage>;
  let todoServiceSpy: jasmine.SpyObj<ToDoService>;

  const mockTodos: ToDo[] = [
    { id: 1, name: 'Test A', dateAdded: new Date() },
    { id: 2, name: 'Test B', dateAdded: new Date(), dateCompleted: new Date() },
  ];

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('ToDoService', [
      'add',
      'delete',
      'toggleComplete',
      'sort'
    ], {
      todos$: of(mockTodos),
      currentSortField: SortField.DateAdded
    });

    await TestBed.configureTestingModule({
      declarations: [ToDoListPage],
      providers: [{ provide: ToDoService, useValue: spy }]
    }).compileComponents();

    fixture = TestBed.createComponent(ToDoListPage);
    component = fixture.componentInstance;
    todoServiceSpy = TestBed.inject(ToDoService) as jasmine.SpyObj<ToDoService>;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load todos from the service on init', () => {
    expect(component.todos.length).toBe(2);
    expect(component.todos[0].name).toBe('Test A');
  });

  it('should set the initial sort field on init', () => {
    expect(component.sortField).toBe(SortField.DateAdded);
  });

  it('should call service.add when add() is triggered with valid input', () => {
    component.newToDo = 'New Task';
    component.add();
    expect(todoServiceSpy.add).toHaveBeenCalledWith('New Task');
    expect(component.newToDo).toBe('');
  });

  it('should not call add if input is empty or whitespace', () => {
    component.newToDo = '  ';
    component.add();
    expect(todoServiceSpy.add).not.toHaveBeenCalled();
  });

  it('should call service.delete with the given id', () => {
    component.delete(123);
    expect(todoServiceSpy.delete).toHaveBeenCalledWith(123);
  });

  it('should call service.toggleComplete with the given todo', () => {
    const todo = mockTodos[0];
    component.toggleComplete(todo);
    expect(todoServiceSpy.toggleComplete).toHaveBeenCalledWith(todo);
  });

  it('should call service.sort with the given sort field', () => {
    component.sort(SortField.Name);
    expect(todoServiceSpy.sort).toHaveBeenCalledWith(SortField.Name);
  });
});