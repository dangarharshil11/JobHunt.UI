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

const routes: Routes = [
  // public Routes
  {path: "", component: HomeComponent},
  {path: "login", component: LoginComponent},
  {path: "register", component: RegisterComponent},
  {path: "job/detail/:id", component: JobDetailComponent},

  // Employer Routes
  {path: "organization/:email", component: CompanyInfoComponent},
  {path: "profile/add", component: AddCompanyDetailsComponent},
  {path: "profile/edit", component: EditCompanyDetailsComponent},
  {path: "vacancy", component: VacancyListComponent},
  {path: "vacancy/add", component: AddVacancyComponent},
  {path: "vacancy/details/:id", component: VacancyDetailComponent},
  {path: "vacancy/edit/:id", component: EditVacancyComponent},

  // JobSeeker Routes
  {path: "user/add", component: AddProfileComponent},
  {path: "user/edit", component: EditProfileComponent},
  {path: "user/:email", component: ProfileComponent},
  {path: "qualification/add", component: AddQualificationComponent},
  {path: "qualification/edit/:id", component: EditQualificationComponent},
  {path: "qualification/:id", component: QualificationListComponent},
  {path: "experience/:id", component: ExperienceListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
