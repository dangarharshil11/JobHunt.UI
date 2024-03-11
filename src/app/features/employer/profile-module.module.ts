import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';

import { ProfileModuleRoutingModule } from './profile-module-routing.module';
import { CompanyInfoComponent } from './company-info/company-info.component';
import { EditCompanyDetailsComponent } from './edit-company-details/edit-company-details.component';
import { AddCompanyDetailsComponent } from './add-company-details/add-company-details.component';

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
  ]
})
export class ProfileModuleModule { }
