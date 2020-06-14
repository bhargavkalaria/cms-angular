import {Component, OnInit} from '@angular/core';
import {QuickCampaignService} from '../../../services/quick-campaign.service';
import {QuickCampaignModel} from '../../../models/quickCampaignModel';
import {UserService} from '../../../services/user.service';
import {CampaignModel} from '../../../models/campaignModel';

@Component({
  selector: 'app-quick-campaign-list',
  templateUrl: './quick-campaign-list.component.html',
  styleUrls: ['./quick-campaign-list.component.scss']
})
export class QuickCampaignListComponent implements OnInit {
  quickCampaignList: QuickCampaignModel[];
  isLoading = true;
  listOfDisplayData: QuickCampaignModel[];
  visible = false;
  searchValue = '';

  constructor(private quickCampaignService: QuickCampaignService,
              public userService: UserService) {
  }

  ngOnInit(): void {
    this.getList();
  }

  getList() {
    this.quickCampaignService.getQuickCampaignList().then((result: any) => {
      this.isLoading = false;
      this.quickCampaignList = [...result];
      this.listOfDisplayData = [...this.quickCampaignList];
    }).catch(error => {
      console.log(error);
    });
  }

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    this.listOfDisplayData = this.quickCampaignList.filter((item) => item.QuickCampaignName.toLowerCase().indexOf(this.searchValue) !== -1);
  }

  sortByDate(e, type) {
    if (type === 'startDate') {
      this.listOfDisplayData.sort((a: QuickCampaignModel, b: QuickCampaignModel) => {
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
      this.listOfDisplayData.sort((a: QuickCampaignModel, b: QuickCampaignModel) => {
        if (e) {
          const dateA: any = new Date(a.CreatedOn);
          const dateB: any = new Date(b.CreatedOn);
          if (e === 'ascend') {
            return (dateA - dateB);
          } else if (e === 'descend') {
            return (dateB - dateA);
          }
        }
      });
    }
  }

  sortByBudget(e) {
    this.listOfDisplayData.sort((a, b) => {
      if (e === 'ascend') {
        return a.CampaignBudget - b.CampaignBudget;
      } else if (e === 'descend') {
        return b.CampaignBudget - a.CampaignBudget;
      }
    });
  }
}
