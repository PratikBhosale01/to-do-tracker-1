import { Component } from '@angular/core';
import { task } from '../model/Task';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ServicesService } from '../Service/services.service';
import { TaskService } from '../Service/task.service';
import { user } from '../model/User';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})
export class ArchiveComponent {
  
  constructor(private http: HttpClient, private log: ServicesService, private router: Router,private taskSer: TaskService) {

  }
  user:user={};
  isLoggedIn: boolean = this.log.loggedin;
  archives: task[] = [];
  data1: any;

  getTask(){this.http.get(`http://localhost:8081/usertask/user/${localStorage.getItem('emailId')}`)
  .subscribe(response => {
    console.log(response);
    this.data1 = response;
    this.archives = this.data1.archive;
  });}

  ngOnInit(): void {
    this.getTask();
    this.user=this.log.user;
  }

  restoreTask(task: any, taskId: any) {

    console.log(task);
    const token = localStorage.getItem('jwtToken');
    this.http.post(`http://localhost:8081/usertask/user/${localStorage.getItem('emailId')}/completed`, task)
      .subscribe(response => {
        console.log(response);

      });
    console.log(taskId);
   alert("You have successfully completed your task and it has been archived. Keep up the productivity!");
    
   
   this.taskSer.deleteArchiveTask(token, taskId).subscribe((response) => {
     console.log(response);
    
    });

   setTimeout(() => {
     this.getTask();
   }, 1000);



  }
  logout() {

    this.log.isloggedout();
    window.location.reload()

  }
  deleteTask(taskId: any) {
    const token = localStorage.getItem('jwtToken');
    this.taskSer.deleteArchiveTask(token, taskId).subscribe((response) => {
      console.log(response);
     
     });
 
    setTimeout(() => {
      this.getTask();
    }, 1000);

  }


  

}
