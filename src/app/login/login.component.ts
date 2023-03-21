import { Component } from '@angular/core';
import {Inject} from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { GoogleService } from './google.service';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  formGroup!: FormGroup;

  isError: boolean = false;
  constructor(
    private googleAuth: GoogleService,
    private router: Router,
    private readonly formbuilder: FormBuilder,
  ) {
    this.formGroup = this.createForm();
  }
  onSubmit(value: any) {
    this.googleAuth.SignIn(value.email, value.password)
      .then(() => {
        this.isError = false;
        console.log(localStorage)
      })
      .catch((err) => {
        this.isError = true;
        setTimeout(() => {
          this.formGroup.reset();
        }, 2000);
      });
  }
  createForm() {
    return this.formbuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }




}


