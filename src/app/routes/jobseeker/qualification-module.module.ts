import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';

import { QualificationModuleRoutingModule } from './qualification-module-routing.module';
import { QualificationListComponent } from './qualification/qualification-list/qualification-list.component';
import { AddQualificationComponent } from './qualification/add-qualification/add-qualification.component';
import { QualificationDetailsComponent } from './qualification/qualification-details/qualification-details.component';
import { EditQualificationComponent } from './qualification/edit-qualification/edit-qualification.component';

@NgModule({
  declarations: [
    QualificationListComponent,
    AddQualificationComponent,
    QualificationDetailsComponent,
    EditQualificationComponent,
  ],
  imports: [
    QualificationModuleRoutingModule,
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
export class QualificationModuleModule { }
