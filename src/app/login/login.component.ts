import { Component } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  isError:boolean = false
  constructor(private readonly authenticationService: AuthenticationService,
    private router:Router) {}
  onSubmit(value: any) {
    this.authenticationService
      .loadUser(value.email, value.password)
      .then(() => {
        console.log('User Acepted');
        this.router.navigate(['/site-list'])
      })
      .catch((err) => {
        this.isError = true;
        setTimeout(() => {
          this.isError = false
        }, 2000);
      });
  }
}
