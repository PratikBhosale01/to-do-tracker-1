import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ServicesService } from '../Service/services.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  public form !: FormGroup;
  

  constructor(private formBuilder: FormBuilder, private snackBar: MatSnackBar, private http: HttpClient, private router: Router,
    private log: ServicesService) {
    this.form = this.formBuilder.group({
      emailId: ['', [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      username: ['', [Validators.required,Validators.maxLength(20),Validators.pattern('^[A-Za-z]+$')]],
      password: ['', [Validators.required , Validators.pattern(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/)]],
     });
  }
  ngOnInit(): void {
    if (this.log.loggedin) {
      alert("You are already login");
      this.router.navigateByUrl("")
    }
  }


  signUp() {
    const user={
      emailId:this.form.value.emailId,
      username:this.form.value.username,
      password:this.form.value.password,
      // firstName:"",
      // lastName:"",
      // contact:"",
      // uploadImage:"",
      userProfile:{},
      tasks:[],
      archive:[],
      completed:[]
    }

    this.http.post('http://localhost:8081/usertask/usertask', user)
      .subscribe(response => {
        console.log(response);
      });
    if (this.form.valid) {
      console.log(this.form.value);
      this.router.navigateByUrl("/login")
      this.snackBar.open('Form submitted successfully!', '', { duration: 3000 });
    } else {
      this.snackBar.open('Please check fields in the form.', '', { duration: 3000 });
    }


  }

  get username(){
    return this.form.get('username');
  }

  get email(){
    return this.form.get('emaiId');
  }

get password(){
  return this.form.get('password');
}



}
