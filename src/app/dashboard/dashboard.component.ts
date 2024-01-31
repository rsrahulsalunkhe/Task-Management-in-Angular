import { Component, OnInit, inject } from '@angular/core';
import { CreateTaskComponent } from './create-task/create-task.component';
import { Task } from '../Model/Task';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgClass } from '@angular/common';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CreateTaskComponent, HttpClientModule, NgClass],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  ngOnInit(): void {
    this.fetchAllTasks();
  }

  editMode: boolean = false;
  selectedTask: Task | undefined;

  showCreateTaskForm: boolean = false;

  toaster = inject(ToastrService);

  http: HttpClient = inject(HttpClient);

  allTasks: Task[] = [];

  taskServices: TaskService = inject(TaskService);

  currentTaskId: string = '';

  OpenCreateTaskForm() {
    this.showCreateTaskForm = true;
    this.editMode = false;
    this.selectedTask = { title: '', desc: '', assignedTo: '', createdAt: '', priority: '', status: '' };
  }

  CloseCreateTaskForm() {
    this.showCreateTaskForm = false;
  }

  CreateOrUpdateTask(data: Task) {
    if (!this.editMode) {
      this.taskServices.CreateTask(data).subscribe((response) => {
        if (response) {
          this.fetchAllTasks();
          this.toaster.success("Task Added Successfully.");
        }
      });
    } else {
      this.taskServices.UpdateTask(this.currentTaskId, data).subscribe((res) => {
        if (res) {
          this.fetchAllTasks();
          this.toaster.success("Task Updated Successfully.");
        }
      });
    }
  }

  private fetchAllTasks() {
    this.taskServices.fetchAllTasks().subscribe((tasks) => {
      this.allTasks = tasks;
    });
  }

  DeleteTask(id: string | undefined) {
    this.taskServices.DeleteTask(id).subscribe(() => {
      this.fetchAllTasks();
    });
    this.toaster.success("Task deleted Successfully");
  }

  DeleteAllTask() {
    this.taskServices.DeleteAllTask().subscribe((res) => {
      this.fetchAllTasks();
    });
    this.toaster.success("All the Task deleted Successfully");
  }

  onEditTaskClicked(id: string | undefined) {
    this.currentTaskId = id;
    this.showCreateTaskForm = true;
    this.editMode = true;

    this.selectedTask = this.allTasks.find((task) => {
      return task.id === id
    })
  }
}
