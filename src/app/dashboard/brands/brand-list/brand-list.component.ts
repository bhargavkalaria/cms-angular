import { Component, OnInit } from '@angular/core';
import { Brand } from '../../../models/Brand.model'
import { ActivatedRoute, Router } from '@angular/router';
import { brandService } from '../../../services/brand.service'
import { NotificationService } from '../../../services/notification.service'
import {Constant} from '../../../utils/constant';

@Component({
  selector: 'app-brand-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.scss']
})
export class BrandListComponent implements OnInit {

  public brandList: Brand[];
  constructor(private router: Router,
    private _brandService: brandService, private _notification: NotificationService) { }


  ngOnInit(): void {
    this._brandService.getBrands().then((result: any) => {
      this.brandList = result
    }).catch(error => {
      this._notification.createNotification(this._notification.notificationError,
      Constant.ErrorShortMessage,Constant.somethingWentWrong)
    })
  }
  Add(): void {
    this.router.navigate(['dashboard/brand']);
  }
  Edit(item: Brand): void {
    this.router.navigate(['dashboard/brand-list/edit/', item.BrandId]);
  }

  delete(item: Brand): void {
    this._brandService.Delete(item.BrandId).then((res:any) => {
      this._notification.createNotification(
      this._notification.notificationSuccess,
      Constant.brandDeleteSuccessShortMessage,res)
      this.ngOnInit()
    }).catch((error: any) => {
      console.log(error)
    })
  }


}
