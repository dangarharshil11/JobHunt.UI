import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddCompanyDetailsComponent } from './company/add-company-details/add-company-details.component';
import { EditCompanyDetailsComponent } from './company/edit-company-details/edit-company-details.component';
import { CompanyInfoComponent } from './company/company-info/company-info.component';
import { authGuard } from '../../shared/guard/auth.guard';
import { AppliedusersListComponent } from './appliedusers-list/appliedusers-list.component';
import { CandidateDetailsComponent } from './candidate-details/candidate-details.component';
import { AddVacancyComponent } from './vacancy/add-vacancy/add-vacancy.component';
import { EditVacancyComponent } from './vacancy/edit-vacancy/edit-vacancy.component';
import { VacancyDetailComponent } from './vacancy/vacancy-detail/vacancy-detail.component';
import { VacancyListComponent } from './vacancy/vacancy-list/vacancy-list.component';

const routes: Routes = [
  //Company Related Routes
  {path: "add", component: AddCompanyDetailsComponent, canActivate: [authGuard]},
  {path: "edit", component: EditCompanyDetailsComponent, canActivate: [authGuard]},
  {path: ":email", component: CompanyInfoComponent, canActivate: [authGuard]},
  
  // Vacancy Related Routes
  {path: "add", component: AddVacancyComponent, canActivate: [authGuard]},
  {path: "edit/:id", component: EditVacancyComponent, canActivate: [authGuard]},
  {path: "details/:id", component: VacancyDetailComponent, canActivate: [authGuard]},
  {path: "applications/:id", component: AppliedusersListComponent, canActivate: [authGuard]},
  {path: "candidate/:id", component: CandidateDetailsComponent, canActivate: [authGuard]},
  {path: "", component: VacancyListComponent, canActivate: [authGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployerRoutingModule { }
