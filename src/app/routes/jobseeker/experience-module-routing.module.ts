import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddExperienceComponent } from './experience/add-experience/add-experience.component';
import { EditExperienceComponent } from './experience/edit-experience/edit-experience.component';
import { ExperienceDetailsComponent } from './experience/experience-details/experience-details.component';
import { ExperienceListComponent } from './experience/experience-list/experience-list.component';
import { authGuard } from '../../shared/guard/auth.guard';

const routes: Routes = [
  {path: "add", component: AddExperienceComponent, canActivate: [authGuard]},
  {path: "edit/:id", component: EditExperienceComponent, canActivate: [authGuard]},
  {path: "details/:id", component: ExperienceDetailsComponent, canActivate: [authGuard]},
  {path: ":id", component: ExperienceListComponent, canActivate: [authGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ExperienceModuleRoutingModule { }
