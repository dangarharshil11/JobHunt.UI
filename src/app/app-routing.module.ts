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
  { path: 'profile', loadChildren: () => import('./routes/employer/profile-module.module').then(m => m.ProfileModuleModule) },
  { path: 'vacancy', loadChildren: () => import('./routes/employer/vacancy-module.module').then(m => m.VacancyModuleModule) },
  
  // JobSeeker Routes
  { path: 'user', loadChildren: () => import('./routes/jobseeker/user-module.module').then(m => m.UserModuleModule) },
  { path: 'experience', loadChildren: () => import('./routes/jobseeker/experience-module.module').then(m => m.ExperienceModuleModule) },
  { path: 'qualification', loadChildren: () => import('./routes/jobseeker/qualification-module.module').then(m => m.QualificationModuleModule) },

  { path: '**', pathMatch: 'full', component: PagenotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
