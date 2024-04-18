import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { AccordionModule } from 'primeng/accordion';

import { ProfileModuleRoutingModule } from './profile-module-routing.module';
import { CompanyInfoComponent } from './company/company-info/company-info.component';
import { EditCompanyDetailsComponent } from './company/edit-company-details/edit-company-details.component';
import { AddCompanyDetailsComponent } from './company/add-company-details/add-company-details.component';

@NgModule({
  declarations: [
    CompanyInfoComponent,
    EditCompanyDetailsComponent,
    AddCompanyDetailsComponent
  ],
  imports: [
    ProfileModuleRoutingModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    InputTextModule,
    DropdownModule,
    InputTextareaModule,
    AccordionModule,
  ]
})
export class ProfileModuleModule { }
