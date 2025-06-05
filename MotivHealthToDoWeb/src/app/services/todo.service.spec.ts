import { TestBed } from '@angular/core/testing';
import { ToDoService } from './todo.service';
import { IToDoClient } from '../clients/todo.client';
import { filter, first, of } from 'rxjs';
import { ToDo } from '../models/domain/todo';
import { SortField } from '../models/enum/sort-field';
import { ToDoMockClient } from '../clients/todo.mock.client';


describe('ToDoService', () => {
    let service: ToDoService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ToDoService,
                { provide: IToDoClient, useClass: ToDoMockClient }
            ]
        });
        service = TestBed.inject(ToDoService);
    });

    it('should initialize and load todos', (done) => {
        service.todos$.pipe(filter(t => t != null), first()).subscribe(todos => {
            expect(todos.length).toBe(2);
            expect(todos[0].name).toBe('Task A');
            done();
        });
    });

    it('should add a new todo and emit updated list', (done) => {
        service.add('New Task');
        service.todos$.pipe(filter(t => t != null), first()).subscribe(todos => {
            expect(todos.some(t => t.name === 'New Task')).toBeTrue();
            done();
        });
    });

    it('should delete a todo and emit updated list', (done) => {
        service.delete(1);
        service.todos$.pipe(filter(t => t != null), first()).subscribe(todos => {
            expect(todos.find(t => t.id === 1)).toBeUndefined();
            done();
        });
    });

    it('should toggle completion status and update the todo', (done) => {
        service.todos$.pipe(filter(t => t != null), first()).subscribe(initialToDos => {
            const todo = initialToDos.find(t => t.id === 1);
            if (!todo) return;

            const originalDate = todo.dateCompleted;
            service.toggleComplete(todo);
            service.todos$.subscribe(updatedToDos => {
                const updated = updatedToDos.find(t => t.id === 1);
                expect(updated).toBeDefined();
                if (originalDate) {
                    expect(updated!.dateCompleted).toBeUndefined();
                } else {
                    expect(updated!.dateCompleted).toBeInstanceOf(Date);
                }
                done();
            });
        });
    });

    it('should sort todos by name', (done) => {
        service.sort(SortField.Name);
        service.todos$.pipe(filter(t => t != null), first()).subscribe(todos => {
            expect(todos[0].name).toBe('Task A');
            expect(todos[1].name).toBe('Task B');
            done();
        });
    });

    it('should sort todos by date added', (done) => {
        service.sort(SortField.DateAdded);
        service.todos$.pipe(filter(t => t != null), first()).subscribe(todos => {
            expect(todos[0].id).toBe(1);
            expect(todos[1].id).toBe(2);
            done();
        });
    });

    it('should sort todos by date completed', (done) => {
        service.sort(SortField.DateCompleted);
        service.todos$.pipe(filter(t => t != null), first()).subscribe(todos => {
            expect(todos[0].id).toBe(1); // incomplete first
            expect(todos[1].id).toBe(2); // completed
            done();
        });
    });
});