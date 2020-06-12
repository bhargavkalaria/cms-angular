import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ReportService} from '../../services/report.service';
import {Constant} from '../../utils/constant';

@Component({
  selector: 'app-data-report',
  templateUrl: './data-report.component.html',
  styleUrls: ['./data-report.component.scss']
})
export class DataReportComponent implements OnInit {
  reportForm: FormGroup;
  dateFormat = Constant.dateFormat;
  isLoading = true;
  startDate;
  endDate;
  List = [];
  reportData = [];
  quickList = [];

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private reportService: ReportService) {
    this.reportForm = this.formBuilder.group({
      CId: [null],
      campaignType: [null, Validators.required],
      range: [null]
    });
  }

  ngOnInit(): void {
    this.isLoading = false;
  }


  dataChanged(data) {
    this.isLoading = true;
    console.log(data);
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
        console.log(res);
        this.reportData.length = 0;
        this.reportData = res;
        this.isLoading = false;
      }).catch(
        (err) => console.log(err)
      );
    }
    // quick-campaign by dates
    if (this.reportForm.controls[Constant.campaignType].value === Constant.reportQuickCampaign
      && this.startDate != null && this.endDate != null) {
      this.reportService.GetQuickCampaignReportByDate(this.startDate, this.endDate).then((res: any) => {
        console.log(res);
        this.reportData.length = 0;
        this.reportData = res;
        this.isLoading = false;
      }).catch(
        (err) => console.log(err)
      );
    }
    // campaign by id
    if (this.reportForm.controls[Constant.campaignType].value === Constant.reportCampaign
      && this.reportForm.controls[Constant.reportCampaignId].value != null) {
      this.reportService.GetCampaignReportById(this.reportForm.controls.CId.value).then((res: any) => {
        console.log(res);
        this.reportData.length = 0;
        this.reportData.push(res);
        this.isLoading = false;

      }).catch(
        (err) => console.log(err)
      );
    }
    // quick-campaign by id
    if (this.reportForm.controls[Constant.campaignType].value === Constant.reportQuickCampaign
      && this.reportForm.controls[Constant.reportCampaignId].value != null) {
      this.reportService.GetQuickCampaignReportById(this.reportForm.controls.CId.value).then((res: any) => {
        console.log(res);
        this.reportData.length = 0;
        this.reportData.push(res);
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
        console.log(res);
        this.reportData.length = 0;
        this.reportData = res;
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
        console.log(res);
        this.reportData.length = 0;
        this.reportData = res;
        this.isLoading = false;
      }).catch(
        (err) => console.log(err)
      );
    }

  }

}
