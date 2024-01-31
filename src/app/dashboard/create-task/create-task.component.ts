import { Component, EventEmitter, Input, Output, ViewChild, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Task } from '../../Model/Task';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.css'
})
export class CreateTaskComponent {
  toaster = inject(ToastrService);

  @Input()
  isEditMode: boolean = false;

  @Input()
  selectedTask: Task | undefined;

  @ViewChild('taskForm')
  taskForm!: NgForm;

  @Output()
  CloseForm: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output()
  EmiteTaskdata: EventEmitter<Task> = new EventEmitter<Task>();

  ngAfterViewInit() {
    setTimeout(() => {
      this.taskForm.form.patchValue(this.selectedTask);
    }, 0);
  }

  OnCloseForm() {

    this.CloseForm.emit(true);
  }

  onFormSubmitted(form: NgForm) {
    if (form.invalid) {
      this.toaster.error("Fill required fields.")
    }
    this.EmiteTaskdata.emit(form.value);
    if (form.valid) {
      this.CloseForm.emit(true);
    }
  }
}
