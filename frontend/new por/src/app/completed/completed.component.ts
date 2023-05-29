import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesService } from '../Service/services.service';
import { task } from '../model/Task';
import { TaskService } from '../Service/task.service';
import { user } from '../model/User';

@Component({
  selector: 'app-completed',
  templateUrl: './completed.component.html',
  styleUrls: ['./completed.component.css']
})
export class CompletedComponent {
  constructor(private http: HttpClient, private log: ServicesService, private router: Router,private taskSer: TaskService) {

  }
  user:user={};
  isLoggedIn: boolean = this.log.loggedin;
   
  completed: task[] = [];
  data1: any;

getTask(){ this.http.get(`http://localhost:8081/usertask/user/${localStorage.getItem('emailId')}`)
.subscribe(response => {
  console.log(response);
  this.data1 = response;
  this.completed = this.data1.completed;
});}


  ngOnInit(): void {

    this.getTask();
    this.user=this.log.user;
  }
  

  
  archiveTask(task: any, taskId: any) {

    console.log(task);
    const token = localStorage.getItem('jwtToken');
    this.http.post(`http://localhost:8081/usertask/user/${localStorage.getItem('emailId')}/archive`, task)
      .subscribe(response => {
        console.log(response);

      });
    console.log(taskId);
   alert("You have successfully completed your task and it has been archived. Keep up the productivity!");
    
   
   this.taskSer.deleteCompletedTask(token, taskId).subscribe((response) => {
    console.log("delted"); 
    console.log(response);
     
    });

   setTimeout(() => {
     this.getTask();
   }, 1000);



  }



  
  getPriorityColor(priority: any) {
    switch (priority) {
      case 'high':
        return { bg: '#f44336', bar: '#b71c1c' }; // red color for high priority
      case 'medium':
        return { bg: '#ffc107', bar: '#ff8f00' }; // yellow color for medium priority
      case 'low':
        return { bg: '#4caf50', bar: '#1b5e20' }; // green color for low priority
      default:
        return { bg: '', bar: '' }; // no color for invalid priority
    }
  }

  logout() {

    this.log.isloggedout();
    window.location.reload()

  }

  restoreTask(task: any, taskId: any){
    const token = localStorage.getItem('jwtToken');
    this.taskSer.addTask(token,task).subscribe((response) => {
      console.log(response);

  })
  alert("Your Task is restored sucessfully!");
    
   
  this.taskSer.deleteCompletedTask(token, taskId).subscribe((response) => {
   console.log("delted"); 
   console.log(response);
    
   });

  setTimeout(() => {
    this.getTask();
  }, 1000);




}

}
