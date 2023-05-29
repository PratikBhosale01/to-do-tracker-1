import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesService } from '../Service/services.service';
import { TaskService } from '../Service/task.service';
import { user } from '../model/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  
  constructor(private http: HttpClient, private log: ServicesService, private router: Router,private taskSer:TaskService) {

  }
  isLoggedIn: boolean =false;
  user:user={};
  longText = ` `;
  logg(){
    console.log(this.log.loggedin)
        this.isLoggedIn = this.log.loggedin;
        this.user=this.log.user;
  }
 
 
  OnInit() {
    this.logg()
  }

  logout() {

    this.log.isloggedout();
    window.location.reload()

  }
 


}
