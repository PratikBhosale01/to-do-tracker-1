import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { task } from '../model/Task';
import { user } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  user:user={};
  taskData:task={};
  tasks: task[] = [];

  loggedin:boolean=false;

  constructor( private http:HttpClient) { 


  }


  login(data:any) {
   return this.http.post('http://localhost:8081/userService/login',data);

   
  }


   isloggedin() {
    this.loggedin=true;
  }


  isloggedout() {
    this.loggedin=false;
    
  }
}
