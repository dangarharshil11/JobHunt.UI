import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { CompanyInfoComponent } from './features/employer/company-info/company-info.component';
import { AddCompanyDetailsComponent } from './features/employer/add-company-details/add-company-details.component';
import { EditCompanyDetailsComponent } from './features/employer/edit-company-details/edit-company-details.component';
import { VacancyListComponent } from './features/employer/vacancy-list/vacancy-list.component';
import { AddVacancyComponent } from './features/employer/add-vacancy/add-vacancy.component';
import { VacancyDetailsComponent } from './features/public/vacancy-details/vacancy-details.component';
import { EditVacancyComponent } from './features/employer/edit-vacancy/edit-vacancy.component';

const routes: Routes = [
  {path: "login", component: LoginComponent},
  {path: "register", component: RegisterComponent},
  {path: "organization/:email", component: CompanyInfoComponent},
  {path: "profile/add", component: AddCompanyDetailsComponent},
  {path: "profile/edit", component: EditCompanyDetailsComponent},
  {path: "vacancy", component: VacancyListComponent},
  {path: "vacancy/add", component: AddVacancyComponent},
  {path: "vacancy/details/:id", component: VacancyDetailsComponent},
  {path: "vacancy/edit/:id", component: EditVacancyComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
