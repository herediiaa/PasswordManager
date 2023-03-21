import { Component } from '@angular/core';
import { PasswordManagerService } from '../password-manager.service';
import { Site } from '../interfaces/sitesInfo.interface';
import { Observable, timeout } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GoogleService } from '../login/google.service';

@Component({
  selector: 'app-site-list',
  templateUrl: './site-list.component.html',
  styleUrls: ['./site-list.component.css'],
})
export class SiteListComponent {
  constructor(
    private readonly passwordManagerService: PasswordManagerService,
    private formBuilder: FormBuilder,
  ) {
    this.loadSites();
    this.formGroup = this.createForm()
    
  }
  allSites!: Observable<Array<any>>;
  formGroup!: FormGroup 
  createForm(){
  return this.formBuilder.group({
    siteName: ["",Validators.required,],
    siteUrl: ["",Validators.required],
    siteImgUrl: ["",Validators.required],
  })}
 
  formCurrentId!: string;
  formState: string = 'Add New';

  isSuccess: boolean = false;
  popText!: string;

  loadSites() {
    this.allSites = this.passwordManagerService.getSites();
  }
  onSubmit(values: Site) {
    if (this.formState === 'Add New') {
      this.passwordManagerService
        .saveSite(values)
        .then(() => {
          this.formGroup = this.formBuilder.group({
            siteName:[null,Validators.required],
            siteImg:[null,Validators.required],
            siteImgUrl:[null,Validators.required],
          })
          this.isSuccess = true;

          setTimeout(() => {
            this.isSuccess = false;
          }, 2000);
        })
        .catch(() => {
        });
    } else if (this.formState === 'Edit') {

      this.passwordManagerService
        .editSite(this.formCurrentId, values)
        .then(() => {
          this.isSuccess = true;
          setTimeout(() => {
            this.isSuccess = false;
          }, 2000);
        })
        .catch(() => {
        });
    }
  }
  editSite(site: any) {
    
    this.formCurrentId = site.id;
    this.formGroup.setValue({
      siteName: site.siteName,
      siteUrl: site.siteUrl,
      siteImgUrl: site.siteImgUrl,
    })
    this.formState = 'Edit';
  }
  deliteSite(id: string) {
    this.passwordManagerService
      .deliteSite(id)
      .then(() => {
        'delite site successfully';
        setTimeout(() => {
          this.isSuccess = false;
        }, 2000);
      })
      .catch(() => {
        'something went wrong';
      });
  }
  messageSuccessfull(mesagge: string) {
    this.isSuccess = true;
    this.popText = mesagge;
  }

}
