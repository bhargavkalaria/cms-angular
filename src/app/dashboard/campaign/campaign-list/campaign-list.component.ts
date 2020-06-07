import {Component, OnInit} from '@angular/core';
import {CampaignService} from '../../../services/campaign.service';
import {NotificationService} from '../../../services/notification.service';
import {Constant} from '../../../utils/constant';

@Component({
  selector: 'app-campaign-list',
  templateUrl: './campaign-list.component.html',
  styleUrls: ['./campaign-list.component.scss']
})
export class CampaignListComponent implements OnInit {
  campaignList;
  searchValue = '';
  visible = false;
  listOfDisplayData;
  isLoading = true;

  constructor(private campaignService: CampaignService, private notificationService: NotificationService) {
  }

  ngOnInit(): void {
    this.getCampaign();
  }

  getCampaign() {
    this.campaignService.getAllCampaign().then(result => {
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
}
