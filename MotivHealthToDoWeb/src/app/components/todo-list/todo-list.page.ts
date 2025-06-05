import { Component } from '@angular/core';
import { ToDo } from 'src/app/models/domain/todo';
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
}
