import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ToDoListPage } from './todo-list.page';

const routes: Routes = [
  {
    path: '',
    component: ToDoListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ToDoListPageRoutingModule { }
