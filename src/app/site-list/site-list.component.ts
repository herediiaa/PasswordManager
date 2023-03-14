import { Component } from '@angular/core';
import { PasswordManagerService } from '../password-manager.service';

@Component({
  selector: 'app-site-list',
  templateUrl: './site-list.component.html',
  styleUrls: ['./site-list.component.css'],
})
export class SiteListComponent {
  constructor(
    private readonly passwordManagerService: PasswordManagerService
  ) {}

  onSubmit(values: Object) {
    this.passwordManagerService
      .saveSite(values)
      .then(() => {
        console.log('data recived successfully');
      })
      .catch(() => {
        console.log('something went wrong');
      });
  }

}
