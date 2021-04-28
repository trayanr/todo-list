import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngxs/store';
import { Task } from '../shared/task.model';
import { AddTask } from '../tasks-state/actions';
import { TasksStateModel } from '../tasks-state/state';

@Component({
  selector: 'app-add-task-modal',
  templateUrl: './add-task-modal.component.html',
  styleUrls: ['./add-task-modal.component.css']
})
export class AddTaskModalComponent implements OnInit {
  form!: FormGroup;

  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder, private store: Store) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  get name() {
    return this.form.get("name");
  }

  get date() {
    return this.form.get("date");
  }

  get time() {
    return this.form.get("time");
  }

  get description() {
    return this.form.get("description");
  }

  saveTask() {
    let unix = Date.UTC(
      this.date?.value.year, 
      this.date?.value.month-1, 
      this.date?.value.day, 
      this.time?.value.hour, 
      this.time?.value.minute);
    let deadline = new Date(unix);
    // this is to create an id, ids should be created in the server
    let s = this.store.snapshot() as {tasks: TasksStateModel};
    console.log(s);
    let id = Math.max(...s.tasks.tasks.map(t => parseInt(t.id))) + 1;
    //
    this.store.dispatch(new AddTask(new Task(id.toString(), this.name?.value, false, this.description?.value, deadline, null)));
    this.activeModal.close();
  }
}
