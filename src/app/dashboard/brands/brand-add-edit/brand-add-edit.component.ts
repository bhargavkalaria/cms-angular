import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { Brand } from '../../../models/brand.model'
import { brandService } from '../../../services/brand.service'
import {  HttpErrorResponse} from '@angular/common/http';
import { NotificationService } from '../../../services/notification.service'

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
      brandId: [null],
      brandName: [null, [Validators.required,Validators.minLength(2)]]
    })
   }


   ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(parameterMap => {
       this.id =  this.activatedRoute.snapshot.params.id
       console.log(this.id)
    });
    if(this.id == null)
    {
      console.log('ADD')
    }
    else{
      this._brandService.getBrandById(this.id).subscribe((res)=> {
        this.brandForm.setValue({
          brandId:res.BrandId,
          brandName:res.BrandName
        })
      })
    }

    
  }

  add():void{
    console.log(this.brandForm.value)
    if(this.brandForm.controls['brandId'].value == null)
    {
      this._brandService.Add(this.brandForm.value).subscribe(
        ()=>{
          this._notification.createNotification(this._notification.notificationSuccess,'Inserted successfully',
        'Brand '+ this.brandForm.controls['brandName'].value+' Added')
        this.router.navigate(['dashboard/brand-list'])
      },
      (err:any)=>{ 
        this._notification.createNotification(this._notification.notificationError,'Error occured',err.error.Message)
      }
      );
    }
    else{
      this._brandService.Update(this.brandForm.value).then(
        (res:any)=>{
          console.log(res)
          this._notification.createNotification(this._notification.notificationSuccess,'Updated successfully',
        'Brand '+ this.brandForm.controls['brandName'].value+' Updated')
        this.router.navigate(['dashboard/brand-list'])
      },
      (err:HttpErrorResponse)=> {
        this._notification.createNotification(this._notification.notificationError,'Error occured',err.error.Message)
      }
      )
    }
  }

}
