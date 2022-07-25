import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddNewTaskComponent } from './components/add-new-task/add-new-task.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'new-task';
  constructor(
    private diaog: MatDialog,
  ){}
  openAddNewTask(){
    this.diaog.open(AddNewTaskComponent,{
      height:'730px',
      width: '70%',
    })
  }
}
