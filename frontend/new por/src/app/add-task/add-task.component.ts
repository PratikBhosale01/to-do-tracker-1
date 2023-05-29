import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesService } from '../Service/services.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../Service/task.service';
import { task } from '../model/Task';
import { user } from '../model/User';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent {

  form: FormGroup

  taskadd: task ={};
  user:user={};
  isLoggedIn: boolean = this.log.loggedin;
  

  constructor(private http: HttpClient, private log:ServicesService ,private router:Router,private fb: FormBuilder,private taskSer:TaskService )  {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(7) ,Validators.pattern('^[A-Za-z]+$')]],
      des: ['', [Validators.required, Validators.minLength(10),Validators.maxLength(50)]],
      date: ['',],
      priorityLevel: [''],
     
    });

  }
  onSubmit() {
    
    if (this.form.valid) {
      console.log(this.form.value);
      this.taskadd=this.form.value;
      this.taskadd.addOnDate= new Date();
      console.log(this.taskadd.addOnDate)
      const token=localStorage.getItem('jwtToken');
      this.taskSer.addTask(token,this.taskadd).subscribe((response) => {
        console.log(response);
     alert("Task Added successfully");
     this.router.navigateByUrl("/Dashboard")

    });
    }
  }
  ngOninit() {
    this.user=this.log.user;
  }


  logout() {

    this.log.isloggedout();
    window.location.reload()
   
    }
    dateToday() {
      return new Date().toISOString().split('T')[0];
    }
  

    get title(){
      return this.form.get('title');
    }

    get des(){
      return this.form.get('des');
    }

    get date(){
      return this.form.get('date');
    }

    get priorityLevel(){
      return this.form.get( 'priorityLevel');
    }
}
