import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddNewTaskComponent } from './components/add-new-task/add-new-task.component';
import { ApiService } from './services/api.service';
import { Constants } from './constants/task.constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'new-task';
  displayedColumns = [
    'client',
    'assignee',
    'due date',
    'email notes',
    'notes',
    'priority',
    'status',
    'task',
    'task type',
    'created by',
    'project',
  ];
  dataSource: any[] = [];

  constructor(private diaog: MatDialog, private ticketService: ApiService) {
    this.getTickets();
  }

  getClientName(id: string) {
    return Constants.clients.find((client) => client.id === id)?.name;
  }

  getAssigneeName(id: string) {
    return Constants.Assignees.find((assignees) => assignees.id === id)?.name;
  }
  getCreatedBy(id: string) {
    return Constants.projectManagers.find((assignees) => assignees.id === id)
      ?.name;
  }

  openAddNewTask() {
    const newTask = this.diaog.open(AddNewTaskComponent, {
      height: '730px',
      width: '70%',
    });

    newTask.afterClosed().subscribe((result) => {
      this.getTickets();
    });
  }

  getTickets() {
    this.ticketService.ticketList().subscribe((response: any) => {
      this.dataSource = response.tickets;
    });
  }
}
