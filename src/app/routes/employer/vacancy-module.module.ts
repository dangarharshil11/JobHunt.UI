import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';

import { VacancyModuleRoutingModule } from './vacancy-module-routing.module';
import { VacancyListComponent } from './vacancy/vacancy-list/vacancy-list.component';
import { VacancyDetailComponent } from './vacancy/vacancy-detail/vacancy-detail.component';
import { AddVacancyComponent } from './vacancy/add-vacancy/add-vacancy.component';
import { EditVacancyComponent } from './vacancy/edit-vacancy/edit-vacancy.component';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { AppliedusersListComponent } from './appliedusers-list/appliedusers-list.component';
import { CandidateDetailsComponent } from './candidate-details/candidate-details.component';
import { AccordionModule } from 'primeng/accordion';


@NgModule({
  declarations: [
    VacancyListComponent,
    VacancyDetailComponent,
    AddVacancyComponent,
    EditVacancyComponent,
    AppliedusersListComponent,
    CandidateDetailsComponent
  ],
  imports: [
    VacancyModuleRoutingModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    InputTextModule,
    DropdownModule,
    InputTextareaModule,
    CalendarModule,
    TableModule,
    AccordionModule
  ]
})
export class VacancyModuleModule { }
