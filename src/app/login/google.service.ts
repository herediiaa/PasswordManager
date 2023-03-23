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
import { JsonPipe } from '@angular/common';

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
    return this.afAuth.signInWithEmailAndPassword(email, password).then((result) => {
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
      photoUrl: user.photoURL,
      emailVerified: user.emailVerified,
    };
    return userData;
  }

  /* registro */
  async signUp(email: string, password: string) {
    let status!:boolean
    const isUser = await this.PasswordManagerService.isUser(email)
    if(isUser == 'user register'){
      console.log("usuario registrado")
      return
    }
    console.log("usuario no registrado")
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
      localStorage.removeItem('userInfo');
      localStorage.removeItem('userPath');
      localStorage.removeItem('user');

      this.userData = null;
      console.log(localStorage.getItem('user'));
      this.router.navigate(['/']);
    });
  }

  /* Registro con Google */
  /* new Auth.GoogleAuthProvider() nos va a abrir la pestana */

  googleAuth() {
    return this.afAuth
      .signInWithPopup(new Auth.GoogleAuthProvider())
      .then((res) => {
        console.log(res);
        this.userData = this.setUserData(res.user);
        localStorage.setItem('userInfo', JSON.stringify(this.userData));
        this.PasswordManagerService.isUser(this.userData).then((respuesta) => {
          if (respuesta == 'user register') {
            console.log('el usuario ya esta en la base de datos');
            console.log(`el usuario ${res.user?.email}`);
            console.log(`bienvenido ${this.userData.displayNamae}`);
            this.router.navigate(['/site-list']);
            return
          }
          this.PasswordManagerService.createUser(this.userData);
          console.log('el usuario es nuevo y se creo en la base de datos');
          this.router.navigate(['/site-list']);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  /*   get isLoggedIn():boolean{
     const user = JSON.parse(localStorage.getItem('user')!)
     return (user !== null && user.emailVerified !== false) ? true : false
    } */
}
