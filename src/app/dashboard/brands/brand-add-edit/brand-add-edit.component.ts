import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { Brand } from '../../../models/brand.model'
import { brandService } from '../../../services/brand.service'
import {  HttpErrorResponse} from '@angular/common/http';
import { NotificationService } from '../../../services/notification.service'
import {Constant} from '../../../utils/constant';

@Component({
  selector: 'app-brand-add-edit',
  templateUrl: './brand-add-edit.component.html',
  styleUrls: ['./brand-add-edit.component.scss']
})
export class BrandAddEditComponent implements OnInit {
  brandForm : FormGroup;
  id;
  item:Brand;
  public brand: Brand[] ;
  constructor(private router: Router,private formBuilder: FormBuilder,
    private _brandService:brandService,private activatedRoute: ActivatedRoute,
    private _notification: NotificationService) {
    this.brandForm = this.formBuilder.group({
      BrandId: [null],
      BrandName: [null, [Validators.required,Validators.minLength(2)]]
    })
   }


  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(parameterMap => {
      this.id =  this.activatedRoute.snapshot.params.id
   });
    if (this.id != null) {
      this._brandService.getBrandById(this.id).then((res: Brand) => {
        this.brandForm.patchValue(res);
      }).catch((err) => {
        console.log(err)
      })
    }
  }

  add():void{
 
    if(this.id ==null)
    {
      this._brandService.Add(this.brandForm.value).then((res:any)=>{
          this._notification.createNotification(
          this._notification.notificationSuccess,
          Constant.brandAddSuccessShortMessage,res);
          this.router.navigate(['dashboard/brand-list']);
          }).catch((err:HttpErrorResponse)=>{ 
          this._notification.createNotification(
          this._notification.notificationError,Constant.ErrorShortMessage,err.error.Message);
        });
    }
    else{
        this._brandService.Update(this.brandForm.value).then((res:any)=>{
        this._notification.createNotification(
        this._notification.notificationSuccess,
        Constant.brandUpdateSuccessShortMessage,res);
          this.router.navigate(['dashboard/brand-list']);
      }).catch((err:HttpErrorResponse)=> {
        this._notification.createNotification(
        this._notification.notificationError,
        Constant.ErrorShortMessage,err.error.Message);
      }
      )
    }
  }

}
