import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Task } from '../shared/task.model';
import { CompleteTask, DeleteTask } from '../tasks-state/actions';

@Component({
  selector: '[app-task]', // table element doesn't allow children that are not thead, tbody, tfoot or tr
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  @Input() task!: Task;
  constructor(private store: Store) { }

  ngOnInit(): void {
  }

  checkValue(event: any) {
    if (event.currentTarget.checked) {
      this.store.dispatch(new CompleteTask(this.task.id));
    }
  }

  deleteTask() {
    this.store.dispatch(new DeleteTask(this.task.id));
  }
}
