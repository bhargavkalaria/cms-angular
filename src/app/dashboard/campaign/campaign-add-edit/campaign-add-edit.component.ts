import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CampaignService} from '../../../services/campaign.service';
import {NotificationService} from '../../../services/notification.service';
import {Constant} from '../../../utils/constant';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';
import {DisabledTimeFn} from 'ng-zorro-antd';
import {CampaignStatusModel} from '../../../models/campaignStatusModel';
import {MarketingTypeModel} from '../../../models/marketingTypeModel';
import {MarketingStrategyModel} from '../../../models/marketingStrategyModel';
import {BrandModel} from '../../../models/brandModel';
import {TemplateModel} from 'src/app/models/templateModel';
import {CustomerModel} from '../../../models/customerModel';
import {CKEditor4} from 'ckeditor4-angular';
import {CustomCampaignModel} from '../../../models/customCampaignModel';
import {ActivatedRoute, Router} from '@angular/router';
import {CampaignModel} from '../../../models/campaignModel';

@Component({
  selector: 'app-campaign-add-edit',
  templateUrl: './campaign-add-edit.component.html',
  styleUrls: ['./campaign-add-edit.component.scss']
})
export class CampaignAddEditComponent implements OnInit {
  today = new Date();
  isLoading = true;
  campaign: FormGroup;
  emailTemplateDesignData = '';
  campaignCreateLoader = false;
  brandList: BrandModel[];
  marketingTypesList: MarketingTypeModel[];
  strategyList: MarketingStrategyModel[];
  emailTemplateList: TemplateModel[];
  campaignStatusList: CampaignStatusModel[];
  customerList: CustomerModel[];
  checked = false;
  indeterminate = false;
  isEmailTemplateChange = null;
  editCampaignId;
  disableDate = {
    startDate: false,
    endDate: false
  };

  constructor(private formBuilder: FormBuilder,
              private campaignService: CampaignService,
              private notificationService: NotificationService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    this.campaign = this.formBuilder.group({
      CampaignId: [],
      CampaignName: [null, [Validators.required]],
      Start_Date: [null, [Validators.required]],
      End_Date: [null, [Validators.required]],
      CampaignBudget: [null, [Validators.required]],
      ExpectedRevenue: [null, [Validators.required]],
      CreatedOn: [this.today, [Validators.required]],
      ModifiedOn: [this.today, [Validators.required]],
      CreatedBy: [1, [Validators.required]],
      CampaignStatusId: [null, [Validators.required]],
      MarketingTypeId: [null, [Validators.required]],
      MarketingStrategyId: [null, [Validators.required]],
      TemplateId: [null, [Validators.required]],
      BrandId: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.editCampaignId = +this.activatedRoute.snapshot.params.id;
    this.campaignStatus();
    this.marketingType();
    this.strategy();
    this.brands();
    this.emailTemplate();
    this.customers();
  }

  setCampaignData() {
    if (this.editCampaignId) {
      this.campaignService.getCampaignById(this.editCampaignId).then((campaignData: CampaignModel) => {
        this.campaign.patchValue(campaignData);
        if (new Date(this.campaign.value.Start_Date) < this.today) {
          this.disableDate.startDate = true;
        }
        if (new Date(this.campaign.value.End_Date) < this.today) {
          this.disableDate.endDate = true;
        }
      }).catch(error => {
        this.router.navigate(['dashboard', 'campaign-list']);
        console.log(error);
      });
    }
  }

  getCustomerByCampaign() {
    this.campaignService.getCustomerByCampaign(this.editCampaignId).then((customer: CustomerModel[]) => {
      this.customerList.forEach((all: any) => {
        customer.forEach(single => {
          if (all.CustomerID === single.CustomerID) {
            all.checked = true;
          }
        });
      });
    }).catch(error => {
      console.log(error);
    });
  }

  disabledStartDate = (current: Date): boolean => {
    return differenceInCalendarDays(current, this.today) < 0;
  };

  disabledEndDate = (current: Date): boolean => {
    this.disabledEndDateTime(current);
    const startDate = new Date(this.campaign.value.Start_Date ? this.campaign.value.Start_Date : '');
    return differenceInCalendarDays(current,
      new Date(startDate.setDate(new Date(startDate).getDate() + 1))) < 0;
  };

  range(start: number, end: number): number[] {
    const result: number[] = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  }

  disabledStartDateTime: DisabledTimeFn = (e: Date) => {
    if (e && (e.toDateString() === this.today.toDateString())) {
      return {
        nzDisabledHours: () => this.range(0, this.today.getHours()),
        nzDisabledMinutes: () => this.range(0, this.today.getMinutes()),
        nzDisabledSeconds: () => [0, this.today.getSeconds()]
      };
    }
  };
  disabledEndDateTime: DisabledTimeFn = (e: Date) => {
    const startDate = new Date(this.campaign.value.Start_Date ? this.campaign.value.Start_Date : '');
    if (e && (e.toDateString() === new Date(startDate.setDate(new Date(startDate).getDate() + 1)).toDateString())) {
      return {
        nzDisabledHours: () => this.range(0, new Date(this.campaign.value.Start_Date ? this.campaign.value.Start_Date : '').getHours()),
        nzDisabledMinutes: () => this.range(0,
          new Date(this.campaign.value.Start_Date ? this.campaign.value.Start_Date : '').getMinutes()),
        nzDisabledSeconds: () => [0, new Date(this.campaign.value.Start_Date ? this.campaign.value.Start_Date : '').getSeconds()]
      };
    }
  };

  brands() {
    this.campaignService.getBrands().then((brands: any) => {
      this.brandList = [...brands];
    }).catch(error => {
      this.notificationService.createNotification(
        this.notificationService.notificationError,
        Constant.somethingWentWrong,
        Constant.brandsErrorMessage
      );
    });
  }

  marketingType() {
    this.campaignService.getMarketingType().then((type: any) => {
      this.marketingTypesList = [...type];
    }).catch(error => {
      this.notificationService.createNotification(
        this.notificationService.notificationError,
        Constant.somethingWentWrong,
        Constant.marketingTypeErrorMessage
      );
    });
  }

  strategy() {
    this.campaignService.getStrategy().then((strategy: any) => {
      this.strategyList = [...strategy];
    }).catch(error => {
      this.notificationService.createNotification(
        this.notificationService.notificationError,
        Constant.somethingWentWrong,
        Constant.strategyErrorMessage
      );
    });
  }

  emailTemplate() {
    this.campaignService.getEmailTemplate().then((template: any) => {
      this.emailTemplateList = [...template];
      this.isLoading = false;
      this.setCampaignData();
    }).catch(error => {
      this.notificationService.createNotification(
        this.notificationService.notificationError,
        Constant.somethingWentWrong,
        Constant.emailTemplateErrorMessage
      );
    });
  }

  campaignStatus() {
    this.campaignService.getCampaignStatus().then((status: any) => {
      this.campaignStatusList = [...status];
    }).catch(error => {
      this.notificationService.createNotification(
        this.notificationService.notificationError,
        Constant.somethingWentWrong,
        Constant.campaignErrorMessage
      );
    });
  }

  customers() {
    this.campaignService.getCustomers().then((customer: any) => {
      this.customerList = [...customer];
      this.customerList.map((d: any) => {
        d.checked = false;
      });
      if (this.editCampaignId) {
        this.getCustomerByCampaign();
      }
    }).catch(error => {
      this.notificationService.createNotification(
        this.notificationService.notificationError,
        Constant.somethingWentWrong,
        Constant.customerErrorMessage
      );
    });
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
      const campaignData: CustomCampaignModel = {
        CampaignViewModel: this.campaign.value,
        CustomerID: customerId,
        Temp: this.isEmailTemplateChange
      };
      if (this.editCampaignId) {
        this.campaignService.updateCampaign(campaignData).then(campaign => {
          this.campaignCreateLoader = false;
          this.router.navigate(['dashboard', 'campaign']);
          this.notificationService.createNotification(
            this.notificationService.notificationSuccess,
            Constant.campaignSuccessUpdateShortMessage,
            this.campaign.value.CampaignName + Constant.campaignSuccessUpdateLongMessage
          );
        }).catch(error => {
          this.campaignCreateLoader = false;
          this.notificationService.createNotification(
            this.notificationService.notificationError,
            Constant.campaignUpdateCreationShortMessage,
            Constant.somethingWentWrong
          );
        });
      } else {
        this.campaignService.postCampaign(campaignData).then(campaign => {
          this.router.navigate(['dashboard', 'campaign']);
          this.campaignCreateLoader = false;
          this.notificationService.createNotification(
            this.notificationService.notificationSuccess,
            Constant.campaignSuccessCreationShortMessage,
            this.campaign.value.CampaignName + Constant.campaignSuccessCreationLongMessage
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
}
