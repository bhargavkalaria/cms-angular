import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ReportService} from '../../services/report.service';
import {ChartDataSets, ChartOptions} from 'chart.js';
import {Color, Label} from 'ng2-charts';
import {Constant} from '../../utils/constant';

@Component({
  selector: 'app-data-graph',
  templateUrl: './data-graph.component.html',
  styleUrls: ['./data-graph.component.scss']
})
export class DataGraphComponent implements OnInit {
  reportForm: FormGroup;
  isLoading = true;
  dateFormat = Constant.dateFormat;
  startDate;
  endDate;
  List = [];
  reportData = [];
  quickList = [];
  filteredOptions = [];

  chartReportData: ChartDataSets[] = [
    {
      label: Constant.Positive,
      data: [],
      backgroundColor: '#D6E9C6',
      stack: 'a'
    },
    {
      label: Constant.Negative,
      data: [],
      backgroundColor: '#FAEBCC',
      stack: 'a'
    },
    {
      label: Constant.Neutral,
      data: [],
      backgroundColor: '#0F2027',
      stack: 'a'
    },
    {
      label: Constant.NoResponse,
      data: [],
      backgroundColor: '#EBCCD1',
      stack: 'a'
    },
  ];
  chartReportLabel: Label[] = [];
  chartReportOptions: ChartOptions = {
    animation: {
      duration: 10,
    },
    responsive: true,
    scales: {
      xAxes: [{
        stacked: true,
        gridLines: {display: false},
      }],
      yAxes: [{
        stacked: true,
        ticks: {stepSize: 3, beginAtZero: true}
      }],
    },

  };

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private reportService: ReportService) {
    this.reportForm = this.formBuilder.group({
      CId: [null],
      campaignType: [null, Validators.required],
      range: [null]
    });
    this.isLoading = false;
  }

  ngOnInit(): void {
  }

  dataChanged(data) {
    this.isLoading = true;
    this.List.length = 0;
    this.quickList.length = 0;
    if (data === Constant.reportCampaign) {
      this.reportService.getCampaigns().then((res: any) => {
        this.List = res;
        this.isLoading = false;
      }).catch(
        (error) => console.log(error)
      );
    }
    if (data === Constant.reportQuickCampaign) {
      this.reportService.getQuickCampaigns().then((res: any) => {
        this.quickList = res;
        this.isLoading = false;
      }).catch(
        (error) => console.log(error)
      );
    }
  }


  Search(): void {
    this.isLoading = true;
    if (this.reportForm.controls[Constant.dateRange].value != null) {
      this.startDate = this.reportForm.controls[Constant.dateRange].value[0];
      this.endDate = this.reportForm.controls[Constant.dateRange].value[1];
    }
    // campaign by dates
    if (this.reportForm.controls[Constant.campaignType].value === Constant.reportCampaign
      && this.startDate != null && this.endDate != null) {
      this.reportService.GetCampaignReportByDate(this.startDate, this.endDate).then((res: any) => {
        this.reportData.length = 0;
        this.reportData = res;
        this.generateReportChart(res);
        this.isLoading = false;
      }).catch(
        (err) => console.log(err)
      );
    }
    // quick-campaign by dates
    if (this.reportForm.controls[Constant.campaignType].value === Constant.reportQuickCampaign
      && this.startDate != null && this.endDate != null) {
      this.reportService.GetQuickCampaignReportByDate(this.startDate, this.endDate).then((res: any) => {
        this.isLoading = false;
        this.reportData.length = 0;
        this.reportData = res;
        this.generateReportChart(res);
        this.isLoading = false;
      }).catch(
        (err) => console.log(err)
      );
    }
    // campaign by id
    if (this.reportForm.controls[Constant.campaignType].value === Constant.reportCampaign
      && this.reportForm.controls[Constant.reportCampaignId].value != null) {
      this.reportService.GetCampaignReportById(this.reportForm.controls[Constant.reportCampaignId].value).then((res: any) => {
        this.reportData.length = 0;
        this.reportData.push(res);
        this.generateReportChart(this.reportData);
        this.isLoading = false;

      }).catch(
        (err) => console.log(err)
      );
    }
    // quick-campaign by id
    if (this.reportForm.controls[Constant.campaignType].value === Constant.reportQuickCampaign
      && this.reportForm.controls[Constant.reportCampaignId].value != null) {
      this.reportService.GetQuickCampaignReportById(this.reportForm.controls[Constant.reportCampaignId].value).then((res: any) => {
        this.reportData.length = 0;
        this.reportData.push(res);
        this.generateReportChart(this.reportData);
        this.isLoading = false;
      }).catch(
        (err) => console.log(err)
      );
    }
    // all campaigns
    if (this.reportForm.controls[Constant.campaignType].value === Constant.reportCampaign
      && this.startDate == null && this.endDate == null
      && this.reportForm.controls[Constant.reportCampaignId].value == null) {
      this.reportService.GetCampaignReportByType().then((res: any) => {
        this.reportData.length = 0;
        this.reportData = res;
        this.generateReportChart(res);
        this.isLoading = false;
      }).catch(
        (err) => console.log(err)
      );
    }
    // all quick-campaigns
    if (this.reportForm.controls[Constant.campaignType].value === Constant.reportQuickCampaign
      && this.startDate == null && this.endDate == null
      && this.reportForm.controls[Constant.reportCampaignId].value == null) {
      this.reportService.GetQuickCampaignReportByType().then((res: any) => {
        this.reportData.length = 0;
        this.reportData = res;
        this.generateReportChart(res);
        this.isLoading = false;
      }).catch(
        (err) => console.log(err)
      );
    }
  }

  generateReportChart(chartData) {
    this.chartReportData[0].data = [];
    this.chartReportData[1].data = [];
    this.chartReportData[2].data = [];
    this.chartReportData[3].data = [];
    this.chartReportLabel = [];
    chartData.forEach(d => {
      this.chartReportData[0].data.push(d.Positive);
      this.chartReportData[1].data.push(d.Negative);
      this.chartReportData[2].data.push(d.Neutral);
      this.chartReportData[3].data.push(d.NoResponse);
      this.chartReportLabel.push(d.CampaignName);
    });
  }

  onChange(e, type) {
    if (type === 'campaign') {
      if (e) {
        this.filteredOptions = [];
        this.filteredOptions = this.List.filter(option => option.CampaignName.toLowerCase().indexOf(e.toLowerCase()) !== -1);
      } else {
        this.filteredOptions = [];
      }
    } else {
      if (e) {
        this.filteredOptions = [];
        this.filteredOptions = this.quickList.filter(option => option.QuickCampaignName.toLowerCase().indexOf(e.toLowerCase()) !== -1);
      } else {
        this.filteredOptions = [];
      }
    }
  }
}
