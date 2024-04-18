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

import { UserModuleRoutingModule } from './user-module-routing.module';
import { ProfileComponent } from './profile/profile/profile.component';
import { AddProfileComponent } from './profile/add-profile/add-profile.component';
import { EditProfileComponent } from './profile/edit-profile/edit-profile.component';
import { ApplicationListComponent } from './application-list/application-list.component';

@NgModule({
  declarations: [
    ProfileComponent,
    AddProfileComponent,
    EditProfileComponent,
    ApplicationListComponent,
  ],
  imports: [
    UserModuleRoutingModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    InputTextModule,
    DropdownModule,
    InputTextareaModule,
    CalendarModule,
    TableModule,
    AccordionModule,
    HttpClientModule,
  ]
})
export class UserModuleModule { }
