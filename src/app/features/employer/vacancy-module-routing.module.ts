import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddVacancyComponent } from './add-vacancy/add-vacancy.component';
import { authGuard } from '../auth/guard/auth.guard';
import { EditVacancyComponent } from './edit-vacancy/edit-vacancy.component';
import { VacancyDetailComponent } from './vacancy-detail/vacancy-detail.component';
import { AppliedusersListComponent } from './appliedusers-list/appliedusers-list.component';
import { VacancyListComponent } from './vacancy-list/vacancy-list.component';
import { CandidateDetailsComponent } from './candidate-details/candidate-details.component';

const routes: Routes = [
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
export class VacancyModuleRoutingModule { }
