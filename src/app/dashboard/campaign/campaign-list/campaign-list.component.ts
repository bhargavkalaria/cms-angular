import {Component, OnInit} from '@angular/core';
import {CampaignService} from '../../../services/campaign.service';
import {NotificationService} from '../../../services/notification.service';
import {Constant} from '../../../utils/constant';
import {CampaignModel} from '../../../models/campaignModel';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-campaign-list',
  templateUrl: './campaign-list.component.html',
  styleUrls: ['./campaign-list.component.scss']
})
export class CampaignListComponent implements OnInit {
  campaignList: CampaignModel[];
  searchValue = '';
  visible = false;
  listOfDisplayData: CampaignModel[];
  isLoading = true;

  constructor(private campaignService: CampaignService,
              private notificationService: NotificationService,
              public userService: UserService) {
  }

  ngOnInit(): void {
    this.getCampaign();
  }

  getCampaign() {
    this.campaignService.getAllCampaign().then((result: any) => {
      this.isLoading = false;
      this.campaignList = result;
      this.listOfDisplayData = [...this.campaignList];
    }).catch(error => {
      this.isLoading = false;
      this.notificationService.createNotification(
        this.notificationService.notificationError,
        Constant.dashboardError,
        Constant.somethingWentWrong
      );
    });
  }

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    this.listOfDisplayData = this.campaignList.filter((item) => item.CampaignName.toLowerCase().indexOf(this.searchValue) !== -1);
  }

  deleteCampaign(campaign) {
    this.isLoading = true;
    this.campaignService.deleteCampaign(campaign.CampaignId).then(result => {
      this.isLoading = true;
      this.getCampaign();
      this.notificationService.createNotification(
        this.notificationService.notificationSuccess,
        Constant.successCampaignDeleteShortMessage,
        campaign.CampaignName + Constant.successCampaignDeleteLongMessage
      );
    }).catch(error => {
      this.isLoading = false;
      this.notificationService.createNotification(
        this.notificationService.notificationError,
        Constant.campaignDeleteError,
        Constant.somethingWentWrong
      );
    });
  }
}
