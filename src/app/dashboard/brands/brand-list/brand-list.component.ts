import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NotificationService} from '../../../services/notification.service';
import {Constant} from '../../../utils/constant';
import {BrandModel} from '../../../models/brandModel';
import {BrandService} from '../../../services/brand.service';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-brand-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.scss']
})
export class BrandListComponent implements OnInit {
  isLoading = true;
  public brandList: BrandModel[];

  constructor(private router: Router,
              private brandService: BrandService,
              private notification: NotificationService,
              public userService: UserService) {
  }


  ngOnInit(): void {
    this.brandService.getBrands().then((result: any) => {
      this.brandList = result;
      this.isLoading = false;
    }).catch(error => {
      this.notification.createNotification(this.notification.notificationError,
        Constant.ErrorShortMessage, Constant.somethingWentWrong);
    });
  }

  Add(): void {
    this.router.navigate(['dashboard/brand-list/create']);
  }

  Edit(item: BrandModel): void {
    this.router.navigate(['dashboard/brand-list/edit/', item.BrandId]);
  }

  delete(item: BrandModel): void {
    this.brandService.Delete(item.BrandId).then((res: any) => {
      this.notification.createNotification(
        this.notification.notificationSuccess,
        Constant.brandDeleteSuccessShortMessage, res);
      this.ngOnInit();
    }).catch((error: any) => {
      console.log(error);
    });
  }


}
