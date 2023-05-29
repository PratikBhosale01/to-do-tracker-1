import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { task } from '../model/Task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http:HttpClient) { }


  editTask(token:any,task:task,sr:any){
    const headers = new HttpHeaders({
      'Content-Type'  : 'application/json',
      'Authorization' : `Bearer ${token}`
    });
    return this.http.post(`http://localhost:8081/usertask/update/${sr}/${localStorage.getItem('emailId')}`,task,{headers})

  }

  addTask(token:any,task:task){
    const headers = new HttpHeaders({
      'Content-Type'  : 'application/json',
      'Authorization' : `Bearer ${token}`
    });
    return this.http.post(`http://localhost:8081/usertask/user/${localStorage.getItem('emailId')}/task`,task,{headers});
  }

  deleteTask(token:any,id:any){
    const headers = new HttpHeaders({
      'Content-Type'  : 'application/json',
      'Authorization' : `Bearer ${token}`
    });
    return this.http.delete(`http://localhost:8081/usertask/user/delete/${id}/${localStorage.getItem('emailId')}`,{headers});
    
  }

  deleteCompletedTask(token:any,id:any){
    const headers = new HttpHeaders({
      'Content-Type'  : 'application/json',
      'Authorization' : `Bearer ${token}`
    });
    return this.http.delete(`http://localhost:8081/usertask/user/deleteCompletedList/${id}/${localStorage.getItem('emailId')}`,{headers});
    
  }

  deleteArchiveTask(token:any,id:any){
    const headers = new HttpHeaders({
      'Content-Type'  : 'application/json',
      'Authorization' : `Bearer ${token}`
    });
    return this.http.delete(`http://localhost:8081/usertask/user/deleteArchiveList/${id}/${localStorage.getItem('emailId')}`,{headers});
    
  }

  
}
