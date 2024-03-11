import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './features/public/home/home.component';
import { JobDetailComponent } from './features/public/job-detail/job-detail.component';

const routes: Routes = [
  // public Routes
  { path: "", component: HomeComponent },
  { path: "job/:id", component: JobDetailComponent },

  // Auth Routes
  { path: 'auth', loadChildren: () => import('./features/auth/auth-module.module').then(m => m.AuthModuleModule) },
  
  // Employer Routes
  { path: 'profile', loadChildren: () => import('./features/employer/profile-module.module').then(m => m.ProfileModuleModule) },
  { path: 'vacancy', loadChildren: () => import('./features/employer/vacancy-module.module').then(m => m.VacancyModuleModule) },
  
  // JobSeeker Routes
  { path: 'user', loadChildren: () => import('./features/jobseeker/user-module.module').then(m => m.UserModuleModule) },
  { path: 'experience', loadChildren: () => import('./features/jobseeker/experience-module.module').then(m => m.ExperienceModuleModule) },
  { path: 'qualification', loadChildren: () => import('./features/jobseeker/qualification-module.module').then(m => m.QualificationModuleModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
