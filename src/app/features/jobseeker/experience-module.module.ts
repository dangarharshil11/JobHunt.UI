import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';

import { ExperienceModuleRoutingModule } from './experience-module-routing.module';
import { ExperienceListComponent } from './experience-list/experience-list.component';
import { AddExperienceComponent } from './add-experience/add-experience.component';
import { EditExperienceComponent } from './edit-experience/edit-experience.component';
import { ExperienceDetailsComponent } from './experience-details/experience-details.component';

@NgModule({
  declarations: [
    ExperienceListComponent,
    AddExperienceComponent,
    EditExperienceComponent,
    ExperienceDetailsComponent,
  ],
  imports: [
    ExperienceModuleRoutingModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    InputTextModule,
    DropdownModule,
    InputTextareaModule,
    CalendarModule,
    TableModule
  ]
})
export class ExperienceModuleModule { }
