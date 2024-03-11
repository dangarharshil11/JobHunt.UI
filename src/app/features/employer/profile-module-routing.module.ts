import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddCompanyDetailsComponent } from './add-company-details/add-company-details.component';
import { EditCompanyDetailsComponent } from './edit-company-details/edit-company-details.component';
import { CompanyInfoComponent } from './company-info/company-info.component';
import { authGuard } from '../auth/guard/auth.guard';

const routes: Routes = [
  {path: "add", component: AddCompanyDetailsComponent, canActivate: [authGuard]},
  {path: "edit", component: EditCompanyDetailsComponent, canActivate: [authGuard]},
  {path: ":email", component: CompanyInfoComponent, canActivate: [authGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileModuleRoutingModule { }
