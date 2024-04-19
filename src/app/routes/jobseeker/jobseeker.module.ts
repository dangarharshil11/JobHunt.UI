import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { AccordionModule } from 'primeng/accordion';

import { ProfileComponent } from './profile/profile/profile.component';
import { AddProfileComponent } from './profile/add-profile/add-profile.component';
import { EditProfileComponent } from './profile/edit-profile/edit-profile.component';
import { ApplicationListComponent } from './application-list/application-list.component';
import { AddQualificationComponent } from './qualification/add-qualification/add-qualification.component';
import { EditQualificationComponent } from './qualification/edit-qualification/edit-qualification.component';
import { QualificationDetailsComponent } from './qualification/qualification-details/qualification-details.component';
import { QualificationListComponent } from './qualification/qualification-list/qualification-list.component';
import { AddExperienceComponent } from './experience/add-experience/add-experience.component';
import { EditExperienceComponent } from './experience/edit-experience/edit-experience.component';
import { ExperienceDetailsComponent } from './experience/experience-details/experience-details.component';
import { ExperienceListComponent } from './experience/experience-list/experience-list.component';
import { JobSeekerRoutingModule } from './jobseeker-routing.module';

@NgModule({
  declarations: [
    ProfileComponent,
    AddProfileComponent,
    EditProfileComponent,
    ApplicationListComponent,
    QualificationListComponent,
    AddQualificationComponent,
    QualificationDetailsComponent,
    EditQualificationComponent,
    ExperienceListComponent,
    AddExperienceComponent,
    EditExperienceComponent,
    ExperienceDetailsComponent,
  ],
  imports: [
    JobSeekerRoutingModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    InputTextModule,
    InputTextareaModule,
    CalendarModule,
    TableModule,
    AccordionModule,
    HttpClientModule,
  ]
})
export class JobSeekerModule { }
