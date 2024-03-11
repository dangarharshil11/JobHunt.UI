import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './features/public/home/home.component';
import { JobDetailComponent } from './features/public/job-detail/job-detail.component';
import { ProfileComponent } from './features/jobseeker/profile/profile.component';
import { AddProfileComponent } from './features/jobseeker/add-profile/add-profile.component';
import { EditProfileComponent } from './features/jobseeker/edit-profile/edit-profile.component';
import { QualificationListComponent } from './features/jobseeker/qualification-list/qualification-list.component';
import { AddQualificationComponent } from './features/jobseeker/add-qualification/add-qualification.component';
import { EditQualificationComponent } from './features/jobseeker/edit-qualification/edit-qualification.component';
import { ExperienceListComponent } from './features/jobseeker/experience-list/experience-list.component';
import { AddExperienceComponent } from './features/jobseeker/add-experience/add-experience.component';
import { EditExperienceComponent } from './features/jobseeker/edit-experience/edit-experience.component';
import { ExperienceDetailsComponent } from './features/jobseeker/experience-details/experience-details.component';
import { QualificationDetailsComponent } from './features/jobseeker/qualification-details/qualification-details.component';
import { ApplicationListComponent } from './features/jobseeker/application-list/application-list.component';
import { authGuard } from './features/auth/guard/auth.guard';

const routes: Routes = [
  // public Routes
  {path: "", component: HomeComponent},
  {path: "job/:id", component: JobDetailComponent},

  // Auth Routes
  { path: 'auth', loadChildren: () => import('./features/auth/auth-module.module').then(m => m.AuthModuleModule) },
  
  // Employer Routes
  { path: 'profile', loadChildren: () => import('./features/employer/profile-module.module').then(m => m.ProfileModuleModule) },
  { path: 'vacancy', loadChildren: () => import('./features/employer/vacancy-module.module').then(m => m.VacancyModuleModule) },
  

  // JobSeeker Routes
  {path: "user/add", component: AddProfileComponent, canActivate: [authGuard]},
  {path: "user/edit", component: EditProfileComponent, canActivate: [authGuard]},
  {path: "user/:email", component: ProfileComponent, canActivate: [authGuard]},
  {path: "qualification/add", component: AddQualificationComponent, canActivate: [authGuard]},
  {path: "qualification/edit/:id", component: EditQualificationComponent, canActivate: [authGuard]},
  {path: "qualification/details/:id", component:QualificationDetailsComponent, canActivate: [authGuard]},
  {path: "qualification/:id", component: QualificationListComponent, canActivate: [authGuard]},
  {path: "experience/add", component: AddExperienceComponent, canActivate: [authGuard]},
  {path: "experience/edit/:id", component: EditExperienceComponent, canActivate: [authGuard]},
  {path: "experience/details/:id", component: ExperienceDetailsComponent, canActivate: [authGuard]},
  {path: "experience/:id", component: ExperienceListComponent, canActivate: [authGuard]},
  {path: "applications", component: ApplicationListComponent, canActivate: [authGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
