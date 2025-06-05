import { Component } from '@angular/core';
import { ToDo } from 'src/app/models/domain/todo';
import { SortField } from 'src/app/models/enum/sort-field';
import { ToDoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.page.html',
  styleUrls: ['todo-list.page.scss'],
  standalone: false,
})
export class ToDoListPage {
  newToDo = '';
  todos: ToDo[] = [];

  constructor(private todoService: ToDoService) {
    this.todoService.todos$.subscribe(t => {
      this.todos = t;
    });
  }
  SortField = SortField; // so it's usable in the template
  sortField: SortField = SortField.DateAdded;

  ngOnInit() {
    this.sortField = this.todoService.currentSortField;
  }
  add() {
    if (this.newToDo.trim()) {
      this.todoService.add(this.newToDo.trim());
      this.newToDo = '';
    }
  }

  delete(id: number) {
    this.todoService.delete(id);
  }

  toggleComplete(toDo: ToDo) {
    this.todoService.toggleComplete(toDo);
  }

  sort(field: SortField) {
    this.todoService.sort(field);
  }
}