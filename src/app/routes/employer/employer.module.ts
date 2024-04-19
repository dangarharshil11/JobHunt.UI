import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { AccordionModule } from 'primeng/accordion';

import { CompanyInfoComponent } from './company/company-info/company-info.component';
import { EditCompanyDetailsComponent } from './company/edit-company-details/edit-company-details.component';
import { AddCompanyDetailsComponent } from './company/add-company-details/add-company-details.component';
import { AppliedusersListComponent } from './appliedusers-list/appliedusers-list.component';
import { CandidateDetailsComponent } from './candidate-details/candidate-details.component';
import { AddVacancyComponent } from './vacancy/add-vacancy/add-vacancy.component';
import { EditVacancyComponent } from './vacancy/edit-vacancy/edit-vacancy.component';
import { VacancyDetailComponent } from './vacancy/vacancy-detail/vacancy-detail.component';
import { VacancyListComponent } from './vacancy/vacancy-list/vacancy-list.component';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { EmployerRoutingModule } from './employer-routing.module';

@NgModule({
  declarations: [
    CompanyInfoComponent,
    EditCompanyDetailsComponent,
    AddCompanyDetailsComponent,
    VacancyListComponent,
    VacancyDetailComponent,
    AddVacancyComponent,
    EditVacancyComponent,
    AppliedusersListComponent,
    CandidateDetailsComponent
  ],
  imports: [
    EmployerRoutingModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    InputTextModule,
    InputTextareaModule,
    AccordionModule,
    CalendarModule,
    TableModule,
  ]
})
export class EmployerModule { }
