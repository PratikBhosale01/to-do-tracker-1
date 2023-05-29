import { Component, Input } from '@angular/core';
import { task } from '../model/Task';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicesService } from '../Service/services.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TaskService } from '../Service/task.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent {
//  @Input() Task: task | undefined;

Task:task={};
  form: FormGroup;
 

constructor(private route: ActivatedRoute, private service:ServicesService,private fb: FormBuilder,private http: HttpClient,private router:Router,private taskSer:TaskService) {
  this.form = this.fb.group({
    sr: [''],
    title: ['', [Validators.required, Validators.maxLength(7) ,Validators.pattern('^[A-Za-z]+$')]],
    des: ['',[Validators.required, Validators.minLength(10),Validators.maxLength(40)]],
    date: [''],
    priorityLevel: ['']
   
  });
}

 ngOnInit() {
  this.Task=this.service.taskData;
  console.log("edit task");
  console.log(this.Task);

 }
 onSubmit(){
  console.log("IM IN ON");
  console.log(this.form.valid);
  if (this.form.valid) {
    console.log(this.form.value);
    const token =localStorage.getItem('jwtToken')
    this.taskSer.editTask(token,this.form.value,this.Task.sr).subscribe(response => {
     console.log(response);
    // this.http.post(`http://localhost:8081/usertask/update/${this.Task.sr}/${localStorage.getItem('emailId')}`,this.form.value) .subscribe(response => {
    // console.log(response);
   alert("Task updated successfully");
   this.router.navigateByUrl("/Dashboard")
  });
  }


  
}

dateToday() {
  return new Date().toISOString().split('T')[0];
}
}
