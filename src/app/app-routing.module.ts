import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './routes/public/home/home.component';
import { JobDetailComponent } from './routes/public/job-detail/job-detail.component';
import { PagenotfoundComponent } from './shared/components/pagenotfound/pagenotfound.component';

const routes: Routes = [
  // public Routes
  { path: "", component: HomeComponent },
  { path: "job/:id", component: JobDetailComponent },

  // Auth Routes
  { path: 'auth', loadChildren: () => import('./routes/auth/auth-module.module').then(m => m.AuthModuleModule) },
  
  // Employer Routes
  { path: 'profile', loadChildren: () => import('./routes/employer/employer.module').then(m => m.EmployerModule) },
  { path: 'vacancy', loadChildren: () => import('./routes/employer/employer.module').then(m => m.EmployerModule) },
  
  // JobSeeker Routes
  { path: 'user', loadChildren: () => import('./routes/jobseeker/jobseeker.module').then(m => m.JobSeekerModule) },
  { path: 'experience', loadChildren: () => import('./routes/jobseeker/jobseeker.module').then(m => m.JobSeekerModule) },
  { path: 'qualification', loadChildren: () => import('./routes/jobseeker/jobseeker.module').then(m => m.JobSeekerModule) },

  { path: '**', pathMatch: 'full', component: PagenotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
