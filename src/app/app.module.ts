import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http"

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/components/navabar/navbar.component';
import { HomeComponent } from './routes/public/home/home.component';
import { JobDetailComponent } from './routes/public/job-detail/job-detail.component';
import { AuthInterceptor } from './shared/interceptor/auth.interceptor';

import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';
import { AccordionModule } from 'primeng/accordion';
import { PaginatorModule } from 'primeng/paginator';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,

    HomeComponent,
    JobDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ToastModule,
    BrowserAnimationsModule,
    TableModule,
    ReactiveFormsModule,
    InputTextModule,
    InputTextareaModule,
    DropdownModule,
    CalendarModule,
    AccordionModule,
    PaginatorModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
