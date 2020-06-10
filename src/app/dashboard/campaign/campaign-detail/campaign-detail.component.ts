import {Component, OnInit} from '@angular/core';
import {CampaignService} from '../../../services/campaign.service';
import {ActivatedRoute} from '@angular/router';
import {ChartDataSets} from 'chart.js';
import {Label} from 'ng2-charts';

@Component({
  selector: 'app-campaign-detail',
  templateUrl: './campaign-detail.component.html',
  styleUrls: ['./campaign-detail.component.scss']
})
export class CampaignDetailComponent implements OnInit {
  isLoading = true;
  editCampaignId;
  campaignDetails;
  topThreeCampaignData: ChartDataSets[] = [
    {
      label: 'Positive',
      data: [],
    },
    {
      label: 'Negative',
      data: [],
    },
    {
      label: 'Neutral',
      data: [],
    },
    {
      label: 'No Response',
      data: [],
    },
  ];
  topThreeCampaignLabel: Label[] = [];

  constructor(private campaignService: CampaignService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.editCampaignId = +this.activatedRoute.snapshot.params.id;
    this.getCampaignDetail();
  }

  getCampaignDetail() {
    this.campaignService.detailCampaign(this.editCampaignId).then((campaign: any) => {
      console.log(campaign);
      this.campaignDetails = campaign;
      this.topThreeCampaignData[0].data.push(campaign.Positive);
      this.topThreeCampaignData[1].data.push(campaign.Negative);
      this.topThreeCampaignData[2].data.push(campaign.Neutral);
      this.topThreeCampaignData[3].data.push(campaign.NoResponse);
      this.topThreeCampaignLabel.push(campaign.Campaign.CampaignName);
      this.isLoading = false;
    }).catch(error => {
      this.isLoading = false;
      console.log(error);
    });
  }
}
