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
import { VacancyDetailsComponent } from './features/public/vacancy-details/vacancy-details.component';

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
    VacancyDetailsComponent
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
