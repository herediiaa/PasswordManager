import { Component } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  formGroup!: FormGroup;

  isError: boolean = false;
  constructor(
    private readonly authenticationService: AuthenticationService,
    private router: Router,
    private readonly formbuilder: FormBuilder
  ) {
    this.formGroup = this.createForm();
  }
  onSubmit(value: any) {
    this.authenticationService
      .loadUser(value.email, value.password)
      .then(() => {
        console.log('User Acepted');
        this.isError = false;
        this.router.navigate(['/site-list']);
        
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
