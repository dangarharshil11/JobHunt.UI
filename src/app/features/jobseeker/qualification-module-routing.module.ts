import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddQualificationComponent } from './add-qualification/add-qualification.component';
import { EditQualificationComponent } from './edit-qualification/edit-qualification.component';
import { QualificationDetailsComponent } from './qualification-details/qualification-details.component';
import { QualificationListComponent } from './qualification-list/qualification-list.component';
import { authGuard } from '../auth/guard/auth.guard';

const routes: Routes = [
  {path: "add", component: AddQualificationComponent, canActivate: [authGuard]},
  {path: "edit/:id", component: EditQualificationComponent, canActivate: [authGuard]},
  {path: "details/:id", component:QualificationDetailsComponent, canActivate: [authGuard]},
  {path: ":id", component: QualificationListComponent, canActivate: [authGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class QualificationModuleRoutingModule { }
