import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Site } from '../interfaces/sitesInfo.interface';
@Component({
  selector: 'app-password-list',
  templateUrl: './password-list.component.html',
  styleUrls: ['./password-list.component.css'],
})
export class PasswordListComponent {
  siteInfo !: Site;
  constructor(private readonly router: ActivatedRoute) {
    this.router.queryParams.subscribe((data: any) => {
      console.log(data);
      this.siteInfo = data
    });
  }
}
