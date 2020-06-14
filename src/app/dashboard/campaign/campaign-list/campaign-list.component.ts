import {Component, OnInit} from '@angular/core';
import {CampaignService} from '../../../services/campaign.service';
import {NotificationService} from '../../../services/notification.service';
import {Constant} from '../../../utils/constant';
import {CampaignModel} from '../../../models/campaignModel';
import {UserService} from '../../../services/user.service';
import {NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder} from 'ng-zorro-antd';

interface ColumnItem {
  name: string;
  sortOrder?: NzTableSortOrder;
  sortFn?: NzTableSortFn;
  listOfFilter?: NzTableFilterList;
  filterFn?: NzTableFilterFn;
  filterMultiple?: boolean;
  sortDirections?: NzTableSortOrder[];
}

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

  sortByDate(e, type) {
    if (type === 'startDate') {
      this.listOfDisplayData.sort((a: CampaignModel, b: CampaignModel) => {
        if (e) {
          const dateA: any = new Date(a.Start_Date);
          const dateB: any = new Date(b.Start_Date);
          if (e === 'ascend') {
            return (dateA - dateB);
          } else if (e === 'descend') {
            return (dateB - dateA);
          }
        }
      });
    } else {
      this.listOfDisplayData.sort((a: CampaignModel, b: CampaignModel) => {
        if (e) {
          const dateA: any = new Date(a.End_Date);
          const dateB: any = new Date(b.End_Date);
          if (e === 'ascend') {
            return (dateA - dateB);
          } else if (e === 'descend') {
            return (dateB - dateA);
          }
        }
      });
    }
  }
}
