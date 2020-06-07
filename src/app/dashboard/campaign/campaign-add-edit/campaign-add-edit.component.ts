import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-campaign-add-edit',
  templateUrl: './campaign-add-edit.component.html',
  styleUrls: ['./campaign-add-edit.component.scss']
})
export class CampaignAddEditComponent implements OnInit {
  campaign: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.campaign = this.formBuilder.group({
      CampaignName: [null, [Validators.required]],
      CampaignOwner: [null, [Validators.required]],
      Start_Date: [null, [Validators.required]],
      End_Date: [null, [Validators.required]],
      CampaignBudget: [null, [Validators.required]],
      ExpectedRevenue: [null, [Validators.required]],
      CreatedOn: [null, [Validators.required]],
      ModifiedOn: [null, [Validators.required]],
      CreatedBy: [null, [Validators.required]],
      CampaignStatusId: [null, [Validators.required]],
      MarketingTypeId: [null, [Validators.required]],
      MarketingStrategyId: [null, [Validators.required]],
      TemplateId: [null, [Validators.required]],
      BrandId: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
  }

}
