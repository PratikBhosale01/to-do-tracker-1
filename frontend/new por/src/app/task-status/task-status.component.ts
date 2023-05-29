import { Component } from '@angular/core';
import { ServicesService } from '../Service/services.service';
import { task } from '../model/Task';
import { user } from '../model/User';

@Component({
  selector: 'app-task-status',
  templateUrl: './task-status.component.html',
  styleUrls: ['./task-status.component.css']
})
export class TaskStatusComponent {

  constructor( private log: ServicesService){}
  
  tasks: task[] = [];
  user:user={};
  isLoggedIn: boolean = this.log.loggedin;

  ngOnInit(){
    // console.log(this.log.tasks);
    this.tasks=this.log.tasks;
    // console.log(this.tasks);
    this.user=this.log.user;
  }

   getDueDateStatus(task: task): string {
    if (!task.date) {
      return 'No Due Date';
    }
  
    const today = new Date();
    const dueDate = new Date(task.date);
  
    if (dueDate < today) {
      return 'Overdue';
    } 
    // else if (dueDate.getDate() === today.getDate() && dueDate.getMonth() === today.getMonth() && dueDate.getFullYear() === today.getFullYear()) {
    //   return 'Due Today';
    // } 
    else if (dueDate < new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)) {
      return 'Due Soon';
    } else {
      return 'Not Due Yet';
    }
  }

  logout() {

    this.log.isloggedout();
    window.location.reload()

  }
  
}


