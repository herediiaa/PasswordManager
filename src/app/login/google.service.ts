import { Injectable } from '@angular/core';
import * as Auth from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { PasswordManagerService } from '../password-manager.service';
import {
  Firestore,
  collection,
  getDoc,
  getDocs,
  query,
  where,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class GoogleService {
  userData!: any;
  constructor(
    private readonly afAuth: AngularFireAuth,
    private readonly router: Router,
    private readonly PasswordManagerService: PasswordManagerService,
    private readonly firestoreModule: Firestore
  ) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        console.log(user);
        localStorage.setItem('user', JSON.stringify(user));
        JSON.parse(localStorage.getItem('user')!);
        this.router.navigate(['/site-list']);
      } else {
        localStorage.setItem('user', JSON.stringify(null));
        JSON.parse(localStorage.getItem('user')!);
        console.log(user);
      }
    });
  }

  /* verificacion  */
  SignIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        console.log(result);
        this.userData = this.setUserData(result.user);
        console.log(this.userData);
        this.afAuth.authState.subscribe((user) => {
          if (user) {
            this.router.navigate(['site-list']);
          }
          console.log('google service pa');
        });
      });
  }

  setUserData(user: any) {
    const userData: any = {
      uid: user.uid,
      email: user.email,
      displayNamae: user.displayName,
      photoUrl: user.photoUrl,
      emailVerified: user.emailVerified,
    };
    return userData;
  }

  /* registro */
  async signUp(email: string, password: string) {
    return await this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.sendVerificationEmail();
        this.userData = this.setUserData(result.user);
      });
  }
  sendVerificationEmail() {
    return this.afAuth.currentUser.then((user) => {
      user?.sendEmailVerification().then(() => {
        console.log('email send');
      });
    });
  }
  forgotPassword(email: string) {
    this.afAuth.sendPasswordResetEmail(email).then(() => {
      'reset password email send';
    });
  }
  onLogout() {
    this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      localStorage.removeItem('userId');
      this.userData = null;
      console.log(localStorage.getItem('user'));
      this.router.navigate(['/']);
    });
  }

  /* Registro con Google */
  /* new Auth.GoogleAuthProvider() nos va a abrir la pestana */

  googleAuth() {
    return this.AuthLogin(new Auth.GoogleAuthProvider()).then((result: any) => {
      /* la promesa devuelve un result con datos (user) */
      console.log(result);
      /* guardamos los datos del usuario que se registra userDta */
      this.userData = this.setUserData(result);

      /* guardamos los datos del registrado en el local storage */
      localStorage.setItem('user', JSON.stringify(this.userData));
      
      /* luego usamos la propiedad CreateUser(result.user.email) */
      /* para crear un usuario en el caso de que sea necesario */
      this.PasswordManagerService.createUser(result.user.email)
        .then((response) => {
          if (response != null) {
            console.log('colection de users creada googleService');
          }
          console.log("YA ESTA REGISTRADO")
          
        })
        .catch((err) => {
          this.router.navigate(['/'])
        });
    });
  }

  AuthLogin(provider: any) {
    /* nos va a devolver los datos que le asignemos al provider (usur) */
    return this.afAuth.signInWithPopup(provider);
  }

  /*   get isLoggedIn():boolean{
     const user = JSON.parse(localStorage.getItem('user')!)
     return (user !== null && user.emailVerified !== false) ? true : false
    } */
}
