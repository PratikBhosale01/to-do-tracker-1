import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {  MatSnackBarModule } from '@angular/material/snack-bar';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { RegistrationComponent } from './registration/registration.component';
import { HOMEComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { ArchiveComponent } from './archive/archive.component';
import { TaskStatusComponent } from './task-status/task-status.component';
import { MatIconModule } from '@angular/material/icon';
import { CompletedComponent } from './completed/completed.component';
import { FeatureComponent } from './feature/feature.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { FooterComponent } from './footer/footer.component';
import { ViewprofileComponent } from './viewprofile/viewprofile.component';
import { AddProfileComponent } from './add-profile/add-profile.component';
import {MatInputModule} from '@angular/material/input';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RegistrationComponent,
    HOMEComponent,
    LoginComponent,
    DashboardComponent,
    AddTaskComponent,
    EditTaskComponent,
    ArchiveComponent,
    TaskStatusComponent,
    CompletedComponent,
    FeatureComponent,
    AboutUsComponent,
    FooterComponent,
    ViewprofileComponent,
    AddProfileComponent
  ],
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    MatSnackBarModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatCardModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule
    
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
