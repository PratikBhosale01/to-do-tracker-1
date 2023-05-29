import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesService } from '../Service/services.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  responsedata: any;
  logindetails = this.log.loggedin;
  public token: string = "";
  public form !: FormGroup;
  constructor(private formBuilder: FormBuilder, private snackBar: MatSnackBar, private http: HttpClient, private router: Router,
    private log: ServicesService) {
    this.form = this.formBuilder.group({
        emailId: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
        password: ['', [Validators.required, Validators.minLength(7)]]
    });
  }

  ngOnInit(): void {

   if (this.log.loggedin) {
      alert("You are already login");
      this.router.navigateByUrl("/Dashboard")

    }


  }

  
  login() {
     this.log.login(this.form.value).subscribe({
      next: data => {
    
        setTimeout(() => {
          this.responsedata = data;
          localStorage.setItem("token", this.responsedata.token);
          localStorage.setItem("email", this.responsedata.email);
          console.log(data);
      
          if (this.responsedata.message === "Successfully Logged In") { 
            this.log.isloggedin();
            localStorage.setItem("emailId", this.responsedata.emailId);
            this.router.navigateByUrl("/Dashboard");
            
            this.snackBar.open('Login Successful', '', {
              duration: 3000
            });
          }
        }, 3000)
      },
      error: err => {
        alert("Invalid login details. Try again");
        
      }
    })
  }
 
  

}
