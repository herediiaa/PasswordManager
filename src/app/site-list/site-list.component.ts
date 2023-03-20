import { Component } from '@angular/core';
import { PasswordManagerService } from '../password-manager.service';
import { Site } from '../interfaces/sitesInfo.interface';
import { Observable, timeout } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-site-list',
  templateUrl: './site-list.component.html',
  styleUrls: ['./site-list.component.css'],
})
export class SiteListComponent {
  constructor(
    private readonly passwordManagerService: PasswordManagerService,
    private formBuilder: FormBuilder
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
      console.log(values)
      this.passwordManagerService
        .saveSite(values)
        .then(() => {
          this.formGroup = this.formBuilder.group({
            siteName:[null,Validators.required],
            siteImg:[null,Validators.required],
            siteImgUrl:[null,Validators.required],
          })
          this.isSuccess = true;
          this.messageSuccessfull('New Site Added Successfully');

          setTimeout(() => {
            this.isSuccess = false;
          }, 2000);
        })
        .catch(() => {
          console.log('something went wrong');
        });
    } else if (this.formState === 'Edit') {
      console.log("Aaaaaaaaaaaaaaa")

      this.passwordManagerService
        .editSite(this.formCurrentId, values)
        .then(() => {
          this.isSuccess = true;
          this.messageSuccessfull('Site Edited Correctly');
          setTimeout(() => {
            this.isSuccess = false;
          }, 2000);
        })
        .catch(() => {
          console.log('something went wrong');
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
    console.log(this.formGroup.value)
  }
  deliteSite(id: string) {
    this.passwordManagerService
      .deliteSite(id)
      .then(() => {
        'delite site successfully';
        this.messageSuccessfull('Site Delited Correctly');
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
