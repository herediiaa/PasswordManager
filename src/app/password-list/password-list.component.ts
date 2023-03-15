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
  formGroup: any = {
    email: '',
    userName: '',
    password: '',
  };

  formStatus: string = 'Add New';
  formPasswordId!: string;

  isSuccess: boolean = false;
  popText!: string;


  constructor(
    private readonly router: ActivatedRoute,
    private readonly passwordManagerService: PasswordManagerService
  ) {
    this.router.queryParams.subscribe((data: any) => {
      console.log(data);
      this.siteInfo = data;
    });
    this.loadPasswords();
  }
  onSubmit(data: any) {
    if (this.formStatus === 'Add New') {
      this.passwordManagerService
        .addPasswords(data, this.siteInfo.id)
        .then(() => {
          this.resetForm();
          this.messageSuccessfull('Password Added Correctly')
          setTimeout(() => {
            this.isSuccess = false;
          }, 2000);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (this.formStatus === 'Edit') {
      this.passwordManagerService
        .editPassword(this.formPasswordId, this.siteInfo.id, data)
        .then(() => {
          this.resetForm();
          this.messageSuccessfull('Password Edit Correctly')
          setTimeout(() => {
            this.isSuccess = false;
          }, 2000);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  loadPasswords() {
    this.sitePasswords = this.passwordManagerService.loadPasswords(
      this.siteInfo.id
    );
  }
  onEditPassword(values: any) {
    this.formPasswordId = values.id;
    this.formGroup = values;
    this.formStatus = 'Edit';
  }
  resetForm() {
    this.formGroup = {
      username: '',
      email: '',
      password: '',
    };
    this.formStatus = 'Add New';
  }
  onDeletePassword(id: string) {
    this.passwordManagerService
      .deletePassword(id, this.siteInfo.id)
      .then(() => {
        this.messageSuccessfull('Password Delited Correctly')
        setTimeout(() => {
          this.isSuccess = false;
        }, 2000);
      });
  }
  messageSuccessfull(mesagge: string) {
    this.isSuccess = true;
    this.popText = mesagge;
  }
}
