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
  formModel: Site = {
    siteName: '',
    siteUrl: '',
    siteImgUrl: '',
  };
  formState: string = 'Add New';

  loadSites() {
    this.allSites = this.passwordManagerService.getSites();
  }
  onSubmit(values: Site) {
    this.passwordManagerService
      .saveSite(values)
      .then(() => {
        console.log('data recived successfully');
      })
      .catch(() => {
        console.log('something went wrong');
      });
  }
  editSite(site: Site) {
    console.log(site.id);
    this.formModel = site;
    this.formState = 'Edit '
  }
}
