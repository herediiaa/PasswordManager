import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Site } from '../interfaces/sitesInfo.interface';
import { FormGroup } from '@angular/forms';
import { PasswordManagerService } from '../password-manager.service';
import { Observable } from 'rxjs';
import { AES, enc } from 'crypto-js';
@Component({
  selector: 'app-password-list',
  templateUrl: './password-list.component.html',
  styleUrls: ['./password-list.component.css'],
})
export class PasswordListComponent {
  passwordDecrypte!: string;
  siteInfo!: any;
  sitePasswords!: Array<any>;
  formGroup: any = {
    email: '',
    userName: '',
    password: '',
  };

  formStatus: string = 'Add New';
  formPasswordId!: string;

  isSuccess: boolean = false;
  popText!: string;

  decrypStatus: string = 'Decrypt'
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
      data.password = this.encrypPassword(data.password);
      this.passwordManagerService
        .addPasswords(data, this.siteInfo.id)
        .then(() => {
          this.resetForm();
          this.messageSuccessfull('Password Added Correctly');
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
          this.messageSuccessfull('Password Edit Correctly');
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
    this.passwordManagerService
      .loadPasswords(this.siteInfo.id)
      .subscribe((val) => {
        this.sitePasswords = val;
      });
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
        this.messageSuccessfull('Password Delited Correctly');
        setTimeout(() => {
          this.isSuccess = false;
        }, 2000);
      });
  }
  messageSuccessfull(mesagge: string) {
    this.isSuccess = true;
    this.popText = mesagge;
  }

  encrypPassword(password: string) {
    const secretKey = 'G-KaPdSgVkYp2s5v8y/B?E(H+MbQeThW';
    const passwordEncrypted = AES.encrypt(password, secretKey).toString();
    return passwordEncrypted;
  }
  decryptPassword(password: string) {
    const secretKey = 'G-KaPdSgVkYp2s5v8y/B?E(H+MbQeThW';
    const decryptPassword = AES.decrypt(password, secretKey).toString(enc.Utf8);
    return decryptPassword;
  }
  onDecryptPassword(password: string, i: any) {
    if (this.decrypStatus === "Encrypt") {
      const decPassword = this.encrypPassword(password);
      this.sitePasswords[i].password = decPassword
      console.log("mostrando contrasena encriptada")
      console.log(decPassword)
      this.decrypStatus = "Decrypt"
    }
    else if(this.decrypStatus == "Decrypt"){
      const decPassword = this.decryptPassword(password);
      this.sitePasswords[i].password = decPassword
      this.decrypStatus = "Encrypt"
      console.log("password ")
    }
  }
}
