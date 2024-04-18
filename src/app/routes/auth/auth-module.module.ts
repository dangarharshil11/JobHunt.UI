import { NgModule } from '@angular/core';

import { AuthModuleRoutingModule } from './auth-module-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component
import { DropdownModule } from 'primeng/dropdown';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent
  ],
  imports: [
    AuthModuleRoutingModule,
    DropdownModule,
    ReactiveFormsModule,
    CommonModule,
    InputTextModule,
    DropdownModule,
  ]
})
export class AuthModuleModule { }
