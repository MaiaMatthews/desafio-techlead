import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './pages/login/login.component';
import { LivrosComponent } from './pages/livros/livros.component';

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { Interceptor } from './interceptors/inteceptors';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {
  MatDialogModule
} from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';




@NgModule({
  declarations: [AppComponent, LoginComponent, LivrosComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatDialogModule,
    MatPaginatorModule,
    HttpClientModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
