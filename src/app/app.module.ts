import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { NavbarComponent } from './navbar/navbar.component';
import { SiteListComponent } from './site-list/site-list.component';
import { LoginComponent } from './login/login.component';
import { PasswordListComponent } from './password-list/password-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SingUpComponent } from './sing-up/sing-up.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SiteListComponent,
    LoginComponent,
    PasswordListComponent,
    SingUpComponent,
  ],
  imports: [
    BrowserModule,

    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    AngularFireModule.initializeApp(environment.firebase),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
