import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import {  ReactiveFormsModule } from '@angular/forms';
import { CalendarComponent } from './calendar/calendar.component';
import { SearchPipe } from './search.pipe';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    SearchPipe,
    LoginComponent,

  ],
  imports: [
    BrowserModule,ReactiveFormsModule,FormsModule, AppRoutingModule,  
  RouterModule  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
