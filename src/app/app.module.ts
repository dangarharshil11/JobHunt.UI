import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http"

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { AddCompanyDetailsComponent } from './features/employer/add-company-details/add-company-details.component';
import { CompanyInfoComponent } from './features/employer/company-info/company-info.component';
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

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    AddCompanyDetailsComponent,
    CompanyInfoComponent,
    EditCompanyDetailsComponent,
    VacancyListComponent,
    AddVacancyComponent,
    EditVacancyComponent,
    HomeComponent,
    VacancyDetailComponent,
    JobDetailComponent,
    ProfileComponent,
    AddProfileComponent,
    EditProfileComponent,
    QualificationListComponent,
    AddQualificationComponent,
    EditQualificationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
