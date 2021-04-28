import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxsModule } from '@ngxs/store';
import { environment } from 'src/environments/environment';

import { AppComponent } from './app.component';
import { TasksState } from './tasks-state/state';
import { TaskComponent } from './task/task.component';
import { CustomDatePipe } from './shared/date.pipe';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddTaskModalComponent } from './add-task-modal/add-task-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,
    CustomDatePipe,
    AddTaskModalComponent
  ],
  imports: [
    BrowserModule,
    NgxsModule.forRoot([TasksState], {
      developmentMode: !environment.production
    }),
    NgbModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
