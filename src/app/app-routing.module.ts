import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { CompanyInfoComponent } from './features/employer/company-info/company-info.component';
import { AddCompanyDetailsComponent } from './features/employer/add-company-details/add-company-details.component';
import { EditCompanyDetailsComponent } from './features/employer/edit-company-details/edit-company-details.component';
import { VacancyListComponent } from './features/employer/vacancy-list/vacancy-list.component';
import { AddVacancyComponent } from './features/employer/add-vacancy/add-vacancy.component';
import { EditVacancyComponent } from './features/employer/edit-vacancy/edit-vacancy.component';
import { HomeComponent } from './features/public/home/home.component';
import { VacancyDetailComponent } from './features/employer/vacancy-detail/vacancy-detail.component';
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
import { AppliedusersListComponent } from './features/employer/appliedusers-list/appliedusers-list.component';
import { CandidateDetailsComponent } from './features/employer/candidate-details/candidate-details.component';
import { authGuard } from './features/auth/guard/auth.guard';
import { ForgotPasswordComponent } from './features/auth/forgot-password/forgot-password.component';

const routes: Routes = [
  // public Routes
  {path: "", component: HomeComponent},
  {path: "login", component: LoginComponent},
  {path: "forgotpassword", component: ForgotPasswordComponent},
  {path: "register", component: RegisterComponent},
  {path: "job/:id", component: JobDetailComponent},

  // Employer Routes
  {path: "organization/:email", component: CompanyInfoComponent, canActivate: [authGuard]},
  {path: "profile/add", component: AddCompanyDetailsComponent, canActivate: [authGuard]},
  {path: "profile/edit", component: EditCompanyDetailsComponent, canActivate: [authGuard]},
  {path: "vacancy/add", component: AddVacancyComponent, canActivate: [authGuard]},
  {path: "vacancy/edit/:id", component: EditVacancyComponent, canActivate: [authGuard]},
  {path: "vacancy/details/:id", component: VacancyDetailComponent, canActivate: [authGuard]},
  {path: "vacancy/applications/:id", component: AppliedusersListComponent, canActivate: [authGuard]},
  {path: "vacancy", component: VacancyListComponent, canActivate: [authGuard]},
  {path: "candidate/:id", component: CandidateDetailsComponent, canActivate: [authGuard]},

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
