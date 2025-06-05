

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToDo } from '../models/domain/todo';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';

export abstract class IToDoClient {
    abstract getAll(): Observable<ToDo[]>;
    abstract add(name: string): Observable<ToDo>;
    abstract delete(id: number): Observable<void>;
    abstract update(toDo: ToDo): Observable<ToDo>;
}


@Injectable()
export class ToDoApiClient implements IToDoClient {
    private baseUrl = `${environment.apiBaseUrl}/todo`;

    constructor(private http: HttpClient) { }

    getAll(): Observable<ToDo[]> {
        return this.http.get<ToDo[]>(this.baseUrl).pipe(
            map(todos => todos.map(todo => this.mapToDo(todo)))
        );
    }

    add(name: string): Observable<ToDo> {
        return this.http.post<ToDo>(this.baseUrl, { name }).pipe(
            map(todo => this.mapToDo(todo))
        );
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }

    update(toDo: ToDo): Observable<ToDo> {
        return this.http.put<ToDo>(`${this.baseUrl}/${toDo.id}`,
            toDo);
    }

    private mapToDo(todo: any): ToDo {
        return {
            ...todo,
            dateAdded: new Date(todo.dateAdded),
            dateCompleted: todo.dateCompleted ? new Date(todo.dateCompleted) : undefined,
        };
    }
}