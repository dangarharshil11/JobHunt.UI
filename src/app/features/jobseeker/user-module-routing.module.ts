import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddProfileComponent } from './add-profile/add-profile.component';
import { authGuard } from '../auth/guard/auth.guard';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ProfileComponent } from './profile/profile.component';
import { ApplicationListComponent } from './application-list/application-list.component';


const routes: Routes = [
  {path: "add", component: AddProfileComponent, canActivate: [authGuard]},
  {path: "edit", component: EditProfileComponent, canActivate: [authGuard]},
  {path: "applications", component: ApplicationListComponent, canActivate: [authGuard]},
  {path: ":email", component: ProfileComponent, canActivate: [authGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class UserModuleRoutingModule { }
