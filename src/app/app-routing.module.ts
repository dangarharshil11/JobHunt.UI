import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { CompanyInfoComponent } from './features/employer/company-info/company-info.component';
import { AddCompanyDetailsComponent } from './features/employer/add-company-details/add-company-details.component';

const routes: Routes = [
  {path: "login", component: LoginComponent},
  {path: "register", component: RegisterComponent},
  {path: "profile/add", component: AddCompanyDetailsComponent},
  {path: "organization/:email", component: CompanyInfoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
