import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesService } from '../Service/services.service';
import { task } from '../model/Task';
import { Validators } from '@angular/forms';
import { TaskService } from '../Service/task.service';
import { user } from '../model/User';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  emailId = localStorage.getItem('emailId');
  isLoggedIn: boolean = this.log.loggedin;


  constructor(private http: HttpClient, private log: ServicesService, private router: Router, private taskSer: TaskService) {

  }

  tasks: task[] = [];
  data: any;
  searchTerm: string ="";
  user:user={};



  getTAsk() {
    this.http.get(`http://localhost:8081/usertask/user/${localStorage.getItem('emailId')}`)
      .subscribe(response => {
        console.log(response);
        this.data = response;

        this.tasks = this.data.tasks;
        this.log.user=this.data;
        this.user=this.log.user;

      });


    this.log.tasks = this.tasks;

  }

  ngOnInit(): void {
    this.getTAsk();


  }

  deleteTask(id: any) {
    console.log("i m in delete");
    console.log(id);
    const token = localStorage.getItem('jwtToken');
    this.taskSer.deleteTask(token, id).subscribe((response) => {
      console.log(response);
      alert("Task deleted successfully");
      this.router.navigateByUrl("/")

    });

    setTimeout(() => {
      this.getTAsk();
    }, 1000);

    // this.router.navigate(['/Dashboard'], { skipLocationChange: true }).then(() => {
    //   this.router.navigate(['/Dashboard']);
    // });


  }

  logout() {

    this.log.isloggedout();
    window.location.reload()

  }

  priorityColors = {
    low: 'green',
    medium: 'orange',
    high: 'red'
  };

  getPriorityColor(priority: any) {
    this.log.tasks = this.tasks;
    switch (priority) {
      case 'high':
        return { bg: '#f44336', bar: '#b71c1c' }; // red color for high priority
      case 'medium':
        return { bg: '#ffc107', bar: '#ff8f00' }; // yellow color for medium priority
      case 'low':
        return { bg: '#4caf50', bar: '#1b5e20' }; // green color for low priority
      default:
        return {}; // no color for invalid priority
    }
  

  }

 
  
  

  completeTask(task: any, taskId: any) {

    console.log(task);
    const token = localStorage.getItem('jwtToken');
    this.http.post(`http://localhost:8081/usertask/user/${localStorage.getItem('emailId')}/completed`, task)
      .subscribe(response => {
        console.log(response);

      });
    console.log(taskId);
   alert("You have successfully completed your task and it has been moved to completed task. Keep up the productivity!");
   this.taskSer.deleteTask(token, taskId).subscribe((response) => {
    console.log(response);
    
   

  });

  setTimeout(() => {
    this.getTAsk();
  }, 1000);


  }

  editTask(task: task) {
    // console.log(task);
    this.log.taskData = task;
    // console.log(this.log.taskData);
    this.router.navigate(['/edit-task']);
  }


  searchTask(searchTerm: string) {
    
      if (searchTerm) {
        const searchTermLowerCase = searchTerm.toLowerCase();
       
        console.log(this.tasks.filter(task => task.title?.toLowerCase().includes(searchTermLowerCase)));
       
        return this.tasks = this.tasks.filter(task => task.title?.toLowerCase().includes(searchTermLowerCase));
       
      }
      return this.tasks=this.data.tasks;
   
    
  }

  getDueStatusClass(task: task): String {
    if (!task.date) {
      return 'No Due Date';
    }
    const dueDate = new Date(task.date);
    const currentDate = new Date();
    
    if (dueDate.toDateString() === currentDate.toDateString()) {
      return 'Due Today';
    }
    
    return dueDate < currentDate ? 'text-danger' : 'text-success';
  }
  
  getDueStatusText(task: task): String {
    if (!task.date) {
      return 'No Due Date';
    }
    const dueDate = new Date(task.date);
    const currentDate = new Date();
    
    if (dueDate.toDateString() === currentDate.toDateString()) {
      return 'Due Today';
    }
    
    return dueDate < currentDate ? 'Past Due' : 'Upcoming';
  }

}
