import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../../services/api.service';
import { Constants } from '../../constants/task.constants';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-new-task',
  templateUrl: './add-new-task.component.html',
  styleUrls: ['./add-new-task.component.scss'],
})
export class AddNewTaskComponent implements OnInit {
  task!: FormGroup;
  taskActive = true;
  projMgr = Constants.projectManagers;
  assignees = Constants.Assignees;
  clients = Constants.clients;
  Status = Constants.status;
  taskTypes = Constants.taskTypes;
  priorityTypes = Constants.priorityTypes;

  myControl = new FormControl('');
  constructor(
    private newTaskDialog: MatDialogRef<AddNewTaskComponent>,
    private ticketService: ApiService,
    public fb: FormBuilder
  ) {
    this.task = this.fb.group({
      dueDate: ['', [Validators.required]],
      projManager: ['', [Validators.required]],
      client: ['', [Validators.required]],
      projFile: ['', [Validators.required]],
      task: ['', [Validators.required]],
      status: ['', [Validators.required]],
      asignee: ['', [Validators.required]],
      taskType: ['', [Validators.required]],
      priority: ['', [Validators.required]],
      notes: ['', [Validators.required]],
      emailnotes: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  /**
   * Enable or Disabled task Typing
   */
  activeTaskTyping() {
    this.taskActive = !this.taskActive;
  }

  onSuccess(successText: string, text: string) {
    Swal.fire({
      title: successText,
      text,
      icon: 'success',
      confirmButtonText: 'Ok',
    });
  }

  OnError(title: string) {
    Swal.fire({
      icon: 'error',
      title: title,
      showConfirmButton: true,
    });
  }

  /**
   * Create New Ticket
   */
  createTicket() {
    this.ticketService
      .newTicket(this.createNewTicket())
      .subscribe((response: any) => {
        if (response.status === 'success') {
          this.onSuccess('Sucessfully!', 'Created New Task');
          this.newTaskDialog.close(AddNewTaskComponent);
        } else {
          this.OnError('Unable to Create New Task');
          this.newTaskDialog.close(AddNewTaskComponent);
        }
      });
  }

  /**
   * Return New Ticket Object
   * @returns
   */
  createNewTicket() {
    return {
      created_by: this.task.value.projManager.id,
      client_id: this.task.value.client.id,
      project: this.task.value.projFile,
      task: this.task.value.task,
      status: this.task.value.status,
      assignee_id: this.task.value.asignee.id,
      task_type: this.task.value.taskType,
      priority: this.task.value.priority,
      notes: this.task.value.notes,
      email_notes: this.task.value.emailnotes,
      due_date: this.task.value.dueDate,
    };
  }

  /**
   * Form Controls
   */
  get taskFormControls() {
    return this.task.controls;
  }

  /**
   * Close Dialog
   */
  close() {
    this.newTaskDialog.close(AddNewTaskComponent);
  }
}
