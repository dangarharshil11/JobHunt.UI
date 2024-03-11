import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http"

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './core/components/navbar/navbar.component';
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
import { AuthInterceptor } from './core/interceptor/auth.interceptor';

import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,

    // Home Component
    HomeComponent,
    JobDetailComponent,

    // JobSeeker Component
    ProfileComponent,
    AddProfileComponent,
    EditProfileComponent,
    QualificationListComponent,
    AddQualificationComponent,
    QualificationDetailsComponent,
    EditQualificationComponent,
    ExperienceListComponent,
    AddExperienceComponent,
    EditExperienceComponent,
    ExperienceDetailsComponent,
    ApplicationListComponent,    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ToastModule,
    BrowserAnimationsModule,
    TableModule,
    ReactiveFormsModule,
    InputTextModule,
    InputTextareaModule,
    DropdownModule,
    CalendarModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
