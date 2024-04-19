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
  // Company Profile Related Routes
  { path: 'profile', canActivateChild: [authGuard], 
    children: [
      {path: "add", component: AddCompanyDetailsComponent},
      {path: "edit", component: EditCompanyDetailsComponent},
      {path: ":email", component: CompanyInfoComponent},
    ]
  },
  
  // Vacancy Related Routes
  { path: 'vacancy', canActivateChild: [authGuard], 
    children: [
      {path: "add", component: AddVacancyComponent},
      {path: "edit/:id", component: EditVacancyComponent},
      {path: "details/:id", component: VacancyDetailComponent},
      {path: "applications/:id", component: AppliedusersListComponent},
      {path: "candidate/:id", component: CandidateDetailsComponent},
      {path: "", component: VacancyListComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployerRoutingModule { }
