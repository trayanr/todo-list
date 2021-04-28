import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AddTaskModalComponent } from './add-task-modal/add-task-modal.component';
import { Task } from './shared/task.model';
import { FilterTasksBy, SortTasksBy } from './tasks-state/actions';
import { TasksState, TasksStateModel } from './tasks-state/state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  @Select(TasksState.tasks) tasks$!: Observable<Task[]>;

  constructor(private store: Store, private modalService: NgbModal){}

  ngOnInit() {
  }

  chooseBackgroundColor(task: Task): string{
    if (task.finished == null) {
      return "";
    }
    if (task.deadline < task.finished) {
        return "table-danger";
    }
    if (task.deadline > task.finished) {
      return "table-success";
    }
    return "";
  }

  filter(predicate: boolean|null) {
    this.store.dispatch(new FilterTasksBy(predicate));
  }

  sort(mode: "name_asc"|"name_desc"|"deadline_asc"|"deadline_desc" | "default") {
    console.log(mode);
    this.store.dispatch(new SortTasksBy(mode));
  }

  openModal() {
    // (new AddTaskModalComponent(this.modalService)).open();
    this.modalService.open(AddTaskModalComponent);
  }
}
