import {Component, OnInit} from '@angular/core';
import {QuickCampaignService} from '../../../services/quick-campaign.service';
import {QuickCampaignModel} from '../../../models/quickCampaignModel';
import {UserService} from '../../../services/user.service';

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
}
