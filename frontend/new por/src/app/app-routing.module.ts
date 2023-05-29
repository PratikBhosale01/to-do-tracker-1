import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { HOMEComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { AuthGuard } from './Service/auth.guard';
import { ArchiveComponent } from './archive/archive.component';
import { TaskStatusComponent } from './task-status/task-status.component';
import { CompletedComponent } from './completed/completed.component';
import { FeatureComponent } from './feature/feature.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ViewprofileComponent } from './viewprofile/viewprofile.component';
import { AddProfileComponent } from './add-profile/add-profile.component';

const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'status',canActivate:[AuthGuard],component:TaskStatusComponent},
  {path:'registration',component:RegistrationComponent},
  {path:'home',component:HOMEComponent},
  {path:'Dashboard',component:DashboardComponent},
  {path:'add-task',canActivate:[AuthGuard],component:AddTaskComponent},
  {path:'edit-task',canActivate:[AuthGuard],component:EditTaskComponent},
  {path:'completed-task',canActivate:[AuthGuard],component:CompletedComponent},
  {path:'archive-task',canActivate:[AuthGuard],component:ArchiveComponent},
  {path:'profile',canActivate:[AuthGuard],component:ViewprofileComponent},
  {path:'addprofile',canActivate:[AuthGuard],component:AddProfileComponent},
  {path:'features',component:FeatureComponent},
  {path:'AboutUs',component:AboutUsComponent},
  {path:'**',component:DashboardComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
