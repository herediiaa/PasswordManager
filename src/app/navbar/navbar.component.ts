import { Component } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleService } from '../login/google.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(private googleService: GoogleService) {}
  logout() {
    this.googleService.onLogout()
  }
}
