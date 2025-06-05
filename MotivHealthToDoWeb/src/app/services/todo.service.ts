import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ToDo } from '../models/domain/todo';
import { SortField } from '../models/enum/sort-field';
import { IToDoClient } from '../clients/todo.client';

const SORT_KEY = 'todo-sort-field';

@Injectable({ providedIn: 'root' })
export class ToDoService {
    private todosSubject = new BehaviorSubject<ToDo[]>([]);
    todos$ = this.todosSubject.asObservable();
    private currentSort: SortField = this.loadSortField();
    constructor(private client: IToDoClient) {
        this.refresh();
    }

    refresh() {
        this.client.getAll().subscribe(todos => {
            this.todosSubject.next(this.sortToDos(todos, this.currentSort));
        });
    }

    add(name: string) {
        const now = new Date();
        const newToDo: ToDo = {
            id: 0,
            name,
            dateAdded: now,
        };
        this.client.add(name).subscribe(todo => {
            newToDo.id = todo.id;
        })
        const updated = [...this.todosSubject.value, newToDo];
        this.todosSubject.next(this.sortToDos(updated, this.currentSort));
    }

    toggleComplete(toDo: ToDo) {
        toDo.dateCompleted = toDo.dateCompleted ? undefined : new Date();
        this.client.update(toDo).subscribe();
        this.todosSubject.next(this.sortToDos(this.todosSubject.value, this.currentSort));
    }

    delete(id: number) {
        const updated = this.todosSubject.value.filter(t => t.id !== id);
        this.client.delete(id).subscribe();
        this.todosSubject.next(updated);
    }

    sort(by: SortField) {
        localStorage.setItem(SORT_KEY, by);
        this.currentSort = by;
        this.todosSubject.next(this.sortToDos(this.todosSubject.value, this.currentSort));
    }

    private sortToDos(toDos: ToDo[], by: SortField) {
        const sorted = [...toDos];
        if (by === SortField.Name) {
            sorted.sort((a, b) => a.name.localeCompare(b.name))
        }
        else if (by === SortField.DateAdded) {
            sorted.sort((a, b) => a.dateAdded.getTime() - b.dateAdded.getTime());
        }
        else if (by === SortField.DateCompleted) {
            sorted.sort((a, b) => (a.dateCompleted?.getTime() || 0) - (b.dateCompleted?.getTime() || 0));
        }
        return sorted;
    }

    private loadSortField(): SortField {
        const saved = localStorage.getItem(SORT_KEY);
        if (
            saved === SortField.Name ||
            saved === SortField.DateCompleted ||
            saved === SortField.DateAdded
        ) {
            return saved;
        }
        return SortField.DateAdded;
    }
    get currentSortField(): SortField {
        return this.currentSort;
    }
}