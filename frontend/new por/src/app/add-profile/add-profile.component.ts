import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicesService } from '../Service/services.service';
import { TaskService } from '../Service/task.service';
import { user } from '../model/User';
import { userprofile } from '../model/UserProfile';

@Component({
  selector: 'app-add-profile',
  templateUrl: './add-profile.component.html',
  styleUrls: ['./add-profile.component.css']
})
export class AddProfileComponent {
  userProfile:any={};
  form: any;
  imageFile:any;
  img:any="";
  user:user={};
  isLoggedIn: boolean = this.log.loggedin;


  constructor(private http: HttpClient, private log:ServicesService ,private router:Router,private fb: FormBuilder,private taskSer:TaskService )  {
    this.form = this.fb.group({
      firstName: ['', [Validators.required ,Validators.pattern('^[A-Za-z]+$')]],
      lastName: ['', [Validators.required ,Validators.pattern('^[A-Za-z]+$')]],
      contact: ['', [Validators.required,Validators.maxLength(10)]],
      profilePic: ['',],
      
     
    });}
    
    
    onSubmit() {
      this.user=this.log.user;
       const userProfile={
       firstName:this.form.value.firstName,
       lastName:this.form.value.lastName,
       contact:this.form.value.contact,
       uploadImage:this.userProfile.image,

       }
        console.log(userProfile);
       this.http.post(`http://localhost:8081/usertask/user/${localStorage.getItem('emailId')}/userProfile`,userProfile)
      .subscribe( {next :data => {setTimeout(() => {
        console.log();
        this.router.navigateByUrl("/dashborad")
        alert("Profile addded");},2000)
       

      },error: err => {
        alert("Invalid profile details. Try again");}
       });
     
    }

    uploadImage(event:any){
      if (event.target.files) {
        let file = new FileReader();
        file.readAsDataURL(event.target.files[0]);
        file.onload = (photo: any) => {
          console.log(photo.target.result);
          this.img=photo.target.result;
          this.userProfile.image = photo.target.result;
          // this.img = photo.target.result;
        }
      }
      console.log(this.userProfile);
    }
    
    logout() {

      this.log.isloggedout();
      window.location.reload()
  
    }
    

}
