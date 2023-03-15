import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Site } from '../interfaces/sitesInfo.interface';
import { FormGroup } from '@angular/forms';
import { PasswordManagerService } from '../password-manager.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-password-list',
  templateUrl: './password-list.component.html',
  styleUrls: ['./password-list.component.css'],
})
export class PasswordListComponent {
  siteInfo!: any;
  sitePasswords!: Observable<Array<any>>;
  constructor(
    private readonly router: ActivatedRoute,
    private readonly passwordManagerService: PasswordManagerService
  ) {
    this.router.queryParams.subscribe((data: any) => {
      console.log(data);
      this.siteInfo = data;
    });
    this.loadPasswords()
  }
  onSubmit(data: any) {
    console.log(data);
    this.passwordManagerService
      .addPasswords(data, this.siteInfo.id)
      .then(() => {
        console.log('Site Password saved correctly');
      })
      .catch((err) => {
        console.log(err);
      });
  }
  loadPasswords(){
    this.sitePasswords = this.passwordManagerService.loadPasswords(this.siteInfo.id)
  }
}
