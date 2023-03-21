import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class GoogleService {
  userData!: any;
  constructor(
    private readonly afAuth: AngularFireAuth,
    private readonly router: Router
  ) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        JSON.parse(localStorage.getItem('user')!);
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
      this.userData = null;
      console.log(localStorage.getItem('user'));
      this.router.navigate(['/']);
    });
  }
}
