import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserModel} from '../../../models/userModel';
import { RoleService } from 'src/app/services/role.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NotificationService } from 'src/app/services/notification.service';
import { Constant } from 'src/app/utils/constant';


@Component({
  selector: 'app-update-role',
  templateUrl: './update-role.component.html',
  styleUrls: ['./update-role.component.scss']
})
export class UpdateRoleComponent implements OnInit {
  userId:number;
  userForm:FormGroup;
  fullName:string;
  role:string;
  isLoading=true;
  constructor(private activatedRoute:ActivatedRoute,
    private roleService:RoleService,
    private router: Router,private formBuilder: FormBuilder,
    private notificationService:NotificationService
    ) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      UId:[null],
      FName:[null],
      LName:[null],
      viewCampaignAccess:[null],
      addCampaignAccess:[null],
      editCampaignAccess:[null],
      deleteCampainAccess:[null],
      uploadCustomerAccess:[null],
      addQuickCampaignAccess:[null],
      viewQuickCampaignAccess:[null],
      addTemplateAccess:[null],
      viewTemplateAccess:[null],
      editTemplateAccess:[null],
      deleteTemplateAccess:[null],
      addBrandAccess:[null],
      editBrandAccess:[null],
      viewBrandAccess:[null],
      deleteBrandAccess:[null],
      addUserAccess:[null],
      hasReportAccess:[null]
  });
    this.activatedRoute.paramMap.subscribe(parameterMap => {
      this.userId =  this.activatedRoute.snapshot.params.id
      console.log(this.userId)
   });
    this.roleService.getUserById(this.userId).subscribe((res)=>{
      this.userForm.setValue({
        UId:res.UId,
        FName:res.FName,
        LName:res.LName,
        viewCampaignAccess:res.viewCampaignAccess,
        addCampaignAccess:res.addCampaignAccess,
        editCampaignAccess:res.editCampaignAccess,
        deleteCampainAccess:res.deleteCampainAccess,
        uploadCustomerAccess:res.uploadCustomerAccess,
        addQuickCampaignAccess:res.addQuickCampaignAccess,
        viewQuickCampaignAccess:res.viewQuickCampaignAccess,
        addTemplateAccess:res.addTemplateAccess,
        viewTemplateAccess:res.viewTemplateAccess,
        editTemplateAccess:res.editTemplateAccess,
        deleteTemplateAccess:res.deleteTemplateAccess,
        addBrandAccess:res.addBrandAccess,
        editBrandAccess:res.editBrandAccess,
        viewBrandAccess:res.viewBrandAccess,
        deleteBrandAccess:res.deleteBrandAccess,
        addUserAccess:res.deleteBrandAccess,
        hasReportAccess:res.hasReportAccess
      });
      this.fullName = res.FName + " "+res.LName;
      this.role = res.Role;
    });
  }

  updateAccess(){
    
    console.log("Edit Access Called");
    console.log(this.userForm.value);
    this.roleService.updateAccess(this.userForm.value).then(role => {
      this.router.navigate(['dashboard', 'roles-list']);
      this.notificationService.createNotification(
        this.notificationService.notificationSuccess,
        Constant.editAccessSuccessShortMessage,
        Constant.editAccessSuccessLongMessage
      );
    }).catch(error => {
      this.notificationService.createNotification(
        this.notificationService.notificationError,
        Constant.editAccessFailedMessage,
        Constant.somethingWentWrong
      );
    });
  }
  
}
