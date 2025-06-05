
import { ToDoApiClient } from "src/app/clients/todo.client";
export const environment = {
  production: true,
  toDoClient: ToDoApiClient,
  apiBaseUrl: "http://localhost:5000"
};
