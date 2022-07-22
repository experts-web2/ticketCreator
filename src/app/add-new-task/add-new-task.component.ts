import { Component, Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormControl ,FormGroup ,  Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../api.service';
@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-add-new-task',
  templateUrl: './add-new-task.component.html',
  styleUrls: ['./add-new-task.component.scss']
})
export class AddNewTaskComponent implements OnInit {
  newTask!:FormGroup;
  taskActive=true;
  projMgr=[
  {
    id:'89Mark5fa8faa940010f7c98b',
    name:'Sam'
  },
  {
    id:'89Mark5fa8faa940010f7c97b',
    name:'Ben'
  },{
    id:'89Mark5fa8faa940010f7c96b',
    name:'Jack'
  },{
    id:'89Mark5fa8faa940010f7c95b',
    name:'Lucy'
  }];
   assignees=[{
    id:'89Mark5fa8faa940010f7c94b',
    name:'Mark'
  },
  {
    id:'62dad5fa8faa940010f7c93b',
    name:'Shanon'
  },{
    id:'62dad5fa8faa940010f7c92b',
    name:'Timothy'
  },{
    id:'62dad5fa8faa940010f7c91b',
    name:'Simon'
  }];
   cLients=[
    {
      id:'62dad5fa8faa940010f7c90b',
      name:'Mega Corp.'
    },
    {
      id:'62dad5fa8faa940010f7c89b',
      name:'Allen Groups.'
    },{
      id:'62dad5fa8faa940010f7c88b',
      name:'Harley Davidson'
    },{
      id:'62dad5fa8faa940010f7c87b',
      name:'Alaskan Hikes'
    }
   ];
   Status=['Start','In Progress','Complete'];
   taskTypes=['Buggs','UI/UX','API','Backend','Design'];
   priorityTypes=['Low','Medium','Important','High','Very High']

   myControl = new FormControl('');
  constructor(private dialogref:MatDialogRef<AddNewTaskComponent>,private apiService:ApiService,public fb:FormBuilder) {


    this.newTask = this.fb.group(
      {
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
      }
    );

   }

  ngOnInit(): void {
  }
  valueChange(){
    this.taskActive=!this.taskActive
  }
 
  save(){
    let saveTask={
      created_by:this.newTask.value.projManager.id,
      client:this.newTask.value.client.id,
      project:this.newTask.value.projFile,
      task:this.newTask.value.task,
      status:this.newTask.value.status,
      assignee:this.newTask.value.asignee.id,
      task_type:this.newTask.value.taskType,
      priority:this.newTask.value.priority,
      notes:this.newTask.value.notes,
      email_notes:this.newTask.value.emailnotes,
      due_date:this.newTask.value.dueDate,
    }

    this.apiService.addNewTaskData(saveTask).subscribe((data:any)=>{
      console.log("DATA SAVED",data);
    })
  }
   get newTaskFormControl() {
    return this.newTask.controls;
  }

 close(){
  this.dialogref.close(AddNewTaskComponent)
 }
}
