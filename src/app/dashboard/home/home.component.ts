import {Component, OnInit} from '@angular/core';
import {DashboardService} from '../../services/dashboard.service';
import {NotificationService} from '../../services/notification.service';
import {Constant} from '../../utils/constant';
import {ChartDataSets, ChartOptions} from 'chart.js';
import {Color, Label} from 'ng2-charts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  generalData;
  isLoading = true;
  marketingStrategy = ['Marketing', 'Advertisement'];
  campaignStatusData: ChartDataSets[] = [
    {
      data: [],
      label: 'Active'
    },
    {
      data: [],
      label: 'Completed'
    },
    {
      data: [],
      label: 'Created'
    },
  ];
  campaignStatusLabel: Label[] = [];
  campaignStatusColor: Color[] = [
    {
      backgroundColor: 'transparent',
      borderColor: 'rgba(3,155,229 ,1)',
    },
    {
      backgroundColor: 'transparent',
      borderColor: 'rgba(67,160,71 ,1)',
    },
    {
      backgroundColor: 'transparent',
      borderColor: 'rgba(84,110,122 ,1)',
    }];
  campaignData: ChartDataSets[] = [
    {
      data: [],
      label: 'Campaign',
      backgroundColor: 'rgba(139,195,74 ,1)',
      hoverBackgroundColor: 'rgba(197,225,165 ,1)',
      pointBackgroundColor: 'rgba(197,225,165 ,1)',
      pointBorderColor: 'rgba(197,225,165 ,1)',
    },
  ];
  campaignLabel: Label[] = [];
  topThreeCampaignData: ChartDataSets[] = [
    {
      label: 'Positive',
      data: [],
      stack: 'a'
    },
    {
      label: 'Negative',
      data: [],
      stack: 'a'
    },
    {
      label: 'Neutral',
      data: [],
      stack: 'a'
    },
    {
      label: 'No Response',
      data: [],
      stack: 'a'
    },
  ];
  topThreeCampaignLabel: Label[] = [];
  topBudgetCampaignData: ChartDataSets[] = [
    {
      data: [],
      label: 'Brand',
      backgroundColor: 'rgba(77,208,225 ,1)',
      hoverBackgroundColor: 'rgba(178,235,242 ,1)',
      pointBackgroundColor: 'rgba(178,235,242 ,1)',
      pointBorderColor: 'rgba(178,235,242 ,1)',
    }
  ];
  topBudgetCampaignLabel: Label[] = [];
  topBudgetData: number[] = [];
  topBudgetLabel: Label[] = [];
  topBudgetColors = [
    {
      backgroundColor: ['rgba(26,35,126 ,1)', 'rgba(0,150,136 ,1)', 'rgba(69,90,100 ,1)'],
    },
  ];

  constructor(private dashboardService: DashboardService, private notificationService: NotificationService) {
  }

  ngOnInit(): void {
    this.dashboardService.getDashboardDetails().then(g => {
      this.dashboardService.getCampaignByMonth().then(m => {
        this.dashboardService.getTopFiveBrandByBudget().then(t => {
          this.dashboardService.getCampaignStatusList().then(s => {
            this.dashboardService.getTopThreeResponse().then(r => {
              this.isLoading = false;
              this.generalData = g;
              this.generateLast30DayCampaignGraph(m);
              this.generateTopBudgetCampaignGraph(t);
              this.generateCampaignStatusGraph(s);
              this.generateTop3CampaignGraph(r);
              this.generateTopBudgetGraph(t);
            }).catch(error => {
              this.notificationService.createNotification(
                this.notificationService.notificationError,
                Constant.dashboardError,
                Constant.somethingWentWrong
              );
            });
          }).catch(error => {
            this.notificationService.createNotification(
              this.notificationService.notificationError,
              Constant.dashboardError,
              Constant.somethingWentWrong
            );
          });
        }).catch(error => {
          this.notificationService.createNotification(
            this.notificationService.notificationError,
            Constant.dashboardError,
            Constant.somethingWentWrong
          );
        });
      }).catch(error => {
        this.notificationService.createNotification(
          this.notificationService.notificationError,
          Constant.dashboardError,
          Constant.somethingWentWrong
        );
      });
    }).catch(error => {
      this.notificationService.createNotification(
        this.notificationService.notificationError,
        Constant.dashboardError,
        Constant.somethingWentWrong
      );
    });
  }

  generateCampaignStatusGraph(graphData) {
    graphData.forEach(d => {
      this.campaignStatusData[0].data.push(d.ActiveCount);
      this.campaignStatusLabel.push(d.date);
      this.campaignStatusData[1].data.push(d.CompletedCount);
      this.campaignStatusData[2].data.push(d.CreatedCount);
    });
  }

  generateLast30DayCampaignGraph(graphData) {
    graphData.forEach(d => {
      this.campaignData[0].data.push(d.CampaignCount);
      this.campaignLabel.push(d.NameOfTheYearOrMonth);
    });
  }

  generateTop3CampaignGraph(graphData) {
    graphData.forEach(d => {
      this.topThreeCampaignData[0].data.push(d.Positive);
      this.topThreeCampaignData[1].data.push(d.Negative);
      this.topThreeCampaignData[2].data.push(d.Neutral);
      this.topThreeCampaignData[3].data.push(d.NoResponse);
      this.topThreeCampaignLabel.push(d.CampaignName);
    });
  }

  generateTopBudgetCampaignGraph(graphData) {
    graphData.forEach(d => {
      this.topBudgetCampaignData[0].data.push(d.BrandBudget);
      this.topBudgetCampaignLabel.push(d.BrandName);
    });
  }

  generateTopBudgetGraph(graphData) {
    graphData.forEach(d => {
      this.topBudgetData.push(d.BrandCampaignCount);
      this.topBudgetLabel.push(d.BrandName);
    });
    console.log(this.topBudgetData, this.topBudgetLabel);
  }
}
