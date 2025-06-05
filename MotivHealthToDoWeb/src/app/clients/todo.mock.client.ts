import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { IToDoClient } from './todo.client';
import { ToDo } from '../models/domain/todo';

@Injectable()
export class ToDoMockClient implements IToDoClient {
    private todos: ToDo[] = [
        { id: 1, name: 'Task A', dateAdded: new Date('2024-01-01') },
        { id: 2, name: 'Task B', dateAdded: new Date('2024-02-01'), dateCompleted: new Date('2024-03-01') },
    ];

    getAll() {
        return of(this.todos);
    }

    add(name: string) {
        const newToDo = { id: Math.floor(Math.random() * 1000), name, dateAdded: new Date() };
        this.todos.push(newToDo);
        return of(newToDo);
    }

    update(todo: ToDo) {
        const index = this.todos.findIndex(t => t.id === todo.id);
        if (index >= 0) this.todos[index] = todo;
        return of(todo);
    }

    delete(id: number) {
        this.todos = this.todos.filter(t => t.id !== id);
        return of(undefined);
    }
}