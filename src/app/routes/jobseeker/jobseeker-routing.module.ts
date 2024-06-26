import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddQualificationComponent } from './qualification/add-qualification/add-qualification.component';
import { EditQualificationComponent } from './qualification/edit-qualification/edit-qualification.component';
import { QualificationDetailsComponent } from './qualification/qualification-details/qualification-details.component';
import { QualificationListComponent } from './qualification/qualification-list/qualification-list.component';
import { authGuard } from '../../shared/guard/auth.guard';
import { AddExperienceComponent } from './experience/add-experience/add-experience.component';
import { EditExperienceComponent } from './experience/edit-experience/edit-experience.component';
import { ExperienceDetailsComponent } from './experience/experience-details/experience-details.component';
import { ExperienceListComponent } from './experience/experience-list/experience-list.component';
import { ApplicationListComponent } from './application-list/application-list.component';
import { AddProfileComponent } from './profile/add-profile/add-profile.component';
import { EditProfileComponent } from './profile/edit-profile/edit-profile.component';
import { ProfileComponent } from './profile/profile/profile.component';

const routes: Routes = [
    // User Profile Related Routes
    {path: "add", component: AddProfileComponent, canActivate: [authGuard]},
    {path: "edit", component: EditProfileComponent, canActivate: [authGuard]},
    {path: "applications", component: ApplicationListComponent, canActivate: [authGuard]},
    {path: ":email", component: ProfileComponent, canActivate: [authGuard]},

    // Qualification Related Routes
    { path: "qualification", canActivateChild: [authGuard], 
      children: [
        {path: "add", component: AddQualificationComponent},
        {path: "edit/:id", component: EditQualificationComponent},
        {path: "details/:id", component:QualificationDetailsComponent},
        {path: ":id", component: QualificationListComponent},
      ]
    },

    // Experience Related Routes
    { path: "experience", canActivateChild: [authGuard], 
      children: [
        {path: "add", component: AddExperienceComponent},
        {path: "edit/:id", component: EditExperienceComponent},
        {path: "details/:id", component: ExperienceDetailsComponent},
        {path: ":id", component: ExperienceListComponent},
      ]
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class JobSeekerRoutingModule { }
