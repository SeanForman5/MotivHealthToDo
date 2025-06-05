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
});
