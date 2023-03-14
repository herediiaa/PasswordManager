import { Component } from '@angular/core';
import { PasswordManagerService } from '../password-manager.service';
import { Site } from '../interfaces/sitesInfo.interface';
import { Observable, timeout } from 'rxjs';

@Component({
  selector: 'app-site-list',
  templateUrl: './site-list.component.html',
  styleUrls: ['./site-list.component.css'],
})
export class SiteListComponent {
  constructor(private readonly passwordManagerService: PasswordManagerService) {
    this.loadSites();
  }
  allSites!: Observable<Array<any>>;
  formGroup: Site = {
    siteName: '',
    siteUrl: '',
    siteImgUrl: '',
  };
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
      this.passwordManagerService
        .editSite(this.formCurrentId, this.formGroup)
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
    console.log(site.id);
    this.formGroup = site;
    this.formState = 'Edit';
    this.formCurrentId = site.id;
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
