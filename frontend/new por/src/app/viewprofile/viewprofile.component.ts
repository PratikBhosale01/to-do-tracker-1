import { Component } from '@angular/core';
import { user } from '../model/User';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ServicesService } from '../Service/services.service';
import { TaskService } from '../Service/task.service';
import { userprofile } from '../model/UserProfile';

@Component({
  selector: 'app-viewprofile',
  templateUrl: './viewprofile.component.html',
  styleUrls: ['./viewprofile.component.css']
})
export class ViewprofileComponent {
  
  isLoggedIn: boolean = this.log.loggedin;
  user:user={};
  userProfile: userprofile= {};
  constructor(private http: HttpClient, private log: ServicesService, private router: Router, private taskSer: TaskService) {

  }
 
  getprofile(){
    this.user=this.log.user;
    this.userProfile=this.user.userProfile || {};
    console.log(this.userProfile);
  }

  ngOnInit(): void {
  this.getprofile();

  }

  logout() {

    this.log.isloggedout();
    window.location.reload()

  }
}
