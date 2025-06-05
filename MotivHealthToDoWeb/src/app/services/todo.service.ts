import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ToDo } from '../models/domain/todo';
import { IToDoClient } from '../clients/todo.client';

@Injectable({ providedIn: 'root' })
export class ToDoService {
    private todosSubject = new BehaviorSubject<ToDo[]>([]);
    todos$ = this.todosSubject.asObservable();
    constructor(private client: IToDoClient) {
        this.refresh();
    }

    refresh() {
        this.client.getAll().subscribe(todos => {
            this.todosSubject.next(todos);
        });
    }
}
