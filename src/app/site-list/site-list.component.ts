import { Component } from '@angular/core';
import { PasswordManagerService } from '../password-manager.service';
import { Site } from '../interfaces/sitesInfo.interface';
import { Observable } from 'rxjs';

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

  loadSites() {
    this.allSites = this.passwordManagerService.getSites();
  }
  onSubmit(values: Site) {
    if (this.formState === 'Add New') {
      this.passwordManagerService
        .saveSite(values)
        .then(() => {
          console.log('data recived successfully');
        })
        .catch(() => {
          console.log('something went wrong');
        });
    } else if (this.formState === 'Edit') {
      this.passwordManagerService
        .editSite(this.formCurrentId, this.formGroup)
        .then(() => {
          console.log('edit site successfully');
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
      })
      .catch(() => {
        'something went wrong';
      });
  }
}
