import { Component } from '@angular/core';
import { GoogleService } from '../login/google.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.component.html',
  styleUrls: ['./sing-up.component.css'],
})
export class SingUpComponent {
  formGroup!: FormGroup;
  isError: boolean = false;
  isSuccess: boolean = false;
  popMessage!: string;
  constructor(
    private googleAuth: GoogleService,
    private router: Router,
    private readonly formbuilder: FormBuilder
  ) {
    this.formGroup = this.createForm();
  }

  async onSubmit(value: any) {
    await this.googleAuth
      .signUp(value.email, value.password)
      .then(() => {
        this.formSucces('Account Registered Successfully')
        setTimeout(() => {
          this.router.navigate(['/']);
          this.isSuccess = false
        }, 2000);
      })
      .catch((err) => {
        if (err.code === 'auth/email-already-in-use') {
          this.formError('Email is Already Registered');
          setTimeout(() => {
            this.isError = false
          }, 2000);
        } else if (err.code === 'auth/weak-password') {
          this.formError('Password must have more than 6 characters');
          setTimeout(() => {
            this.isError = false
          }, 2000);
        }
      });
  }
  createForm() {
    return this.formbuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  formError(text: string) {
    this.isError = true;
    this.popMessage = text;
  }
  formSucces(text: string) {
    this.isSuccess = true;
    this.popMessage = text;
  }
  registerByGoogle(){
    return this.googleAuth.googleAuth()
  }
}
