import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private readonly auth: Auth) {}
  
  loadUser(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }
}
