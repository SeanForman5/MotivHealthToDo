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

});
