import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';
import {DisabledTimeFn} from 'ng-zorro-antd';
import {CKEditor4} from 'ckeditor4-angular';
import {TemplateModel} from '../../../models/templateModel';
import {Constant} from '../../../utils/constant';
import {CampaignService} from '../../../services/campaign.service';
import {CustomerModel} from '../../../models/customerModel';
import {NotificationService} from '../../../services/notification.service';
import {QuickCampaignService} from '../../../services/quick-campaign.service';
import {Router} from '@angular/router';
import {CustomQuickCampaignModel} from '../../../models/customQuickCampaignModel';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-add-quick-campaign',
  templateUrl: './add-quick-campaign.component.html',
  styleUrls: ['./add-quick-campaign.component.scss']
})
export class AddQuickCampaignComponent implements OnInit {
  quickCampaign: FormGroup;
  today = new Date();
  isLoading = true;
  emailTemplateList: TemplateModel[];
  isEmailTemplateChange = null;
  emailTemplateDesignData = '';
  customerList: CustomerModel[];
  checked = false;
  indeterminate = false;
  campaignCreateLoader = false;

  constructor(private formBuilder: FormBuilder,
              private campaignService: CampaignService,
              private notificationService: NotificationService,
              private quickCampaignService: QuickCampaignService,
              private router: Router) {
    this.quickCampaign = this.formBuilder.group({
      QuickCampaignName: [null, [Validators.required]],
      Start_Date: [null, [Validators.required]],
      CreatedOn: [this.today, [Validators.required]],
      ModifiedOn: [this.today, [Validators.required]],
      CreatedBy: [1, [Validators.required]],
      CampaignBudget: [null, [Validators.required]],
      ExpectedRevenue: [null, [Validators.required]],
      TemplateId: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.customers();
    this.emailTemplate();
  }

  disabledStartDate = (current: Date): boolean => {
    return differenceInCalendarDays(current, this.today) < 0;
  };
  disabledStartDateTime: DisabledTimeFn = (e: Date) => {
    if (e && (e.toDateString() === this.today.toDateString())) {
      return {
        nzDisabledHours: () => this.range(0, this.today.getHours()),
        nzDisabledMinutes: () => this.range(0, this.today.getMinutes()),
        nzDisabledSeconds: () => [0, this.today.getSeconds()]
      };
    }
  };

  range(start: number, end: number): number[] {
    const result: number[] = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  }

  changeEmailTemplate(id) {
    this.emailTemplateList.find(template => {
      if (template.TemplateId === id) {
        this.emailTemplateDesignData = template.TemplateData;
      }
    });
  }

  onChangeTemplate(editor: CKEditor4.EventInfo) {
    this.isEmailTemplateChange = editor.editor.getData('');
  }

  onAllChecked(event) {
    this.customerList.filter((d: any) => {
      d.checked = event;
    });
  }

  onItemChecked(id: number, checked: boolean): void {
    this.customerList.find((d: any) => {
      if (id === d.CustomerID) {
        d.checked = checked;
      }
    });
  }

  emailTemplate() {
    this.campaignService.getEmailTemplate().then((template: any) => {
      this.emailTemplateList = [...template];
      this.isLoading = false;
    }).catch(error => {
      this.notificationService.createNotification(
        this.notificationService.notificationError,
        Constant.somethingWentWrong,
        Constant.emailTemplateErrorMessage
      );
    });
  }

  customers() {
    this.campaignService.getCustomers().then((customer: any) => {
      this.customerList = [...customer];
      this.customerList.map((d: any) => {
        d.checked = false;
      });
    }).catch(error => {
      this.notificationService.createNotification(
        this.notificationService.notificationError,
        Constant.somethingWentWrong,
        Constant.customerErrorMessage
      );
    });
  }

  addCampaign() {
    const customerId = [];
    this.customerList.forEach((d: any) => {
      if (d.checked) {
        customerId.push(d.CustomerID);
      }
    });
    if (customerId.length < 1) {
      this.notificationService.createNotification(
        this.notificationService.notificationError,
        Constant.campaignCustomerShortErrorMessage,
        Constant.campaignCustomerLongErrorMessage
      );
    } else {
      this.campaignCreateLoader = true;
      const campaignData: CustomQuickCampaignModel = {
        QuickCampaignViewModel: this.quickCampaign.value,
        CustomerID: customerId,
        Temp: this.isEmailTemplateChange
      };
      this.quickCampaignService.addCampaignList(campaignData).then(campaign => {
        this.router.navigate(['dashboard', 'quick-campaign-list']);
        this.campaignCreateLoader = false;
        this.notificationService.createNotification(
          this.notificationService.notificationSuccess,
          Constant.campaignSuccessCreationShortMessage,
          this.quickCampaign.value.QuickCampaignName + Constant.campaignSuccessCreationLongMessage
        );
      }).catch(error => {
        this.campaignCreateLoader = false;
        this.notificationService.createNotification(
          this.notificationService.notificationError,
          Constant.campaignErrorCreationShortMessage,
          Constant.somethingWentWrong
        );
      });
    }
  }
}
