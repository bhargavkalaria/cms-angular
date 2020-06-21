import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ReportService} from '../../services/report.service';
import {Constant} from '../../utils/constant';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

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
  searchValue = '';
  visible = false;
  listOfDisplayData = [];
  filteredOptions = [];
  @ViewChild('dummyData', {static: false}) excelData: ElementRef;

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
    this.listOfDisplayData = [];
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
        this.listOfDisplayData = this.reportData;
        this.isLoading = false;
      }).catch(
        (err) => console.log(err)
      );
    }
    // quick-campaign by dates
    if (this.reportForm.controls[Constant.campaignType].value === Constant.reportQuickCampaign
      && this.startDate != null && this.endDate != null) {
      this.reportService.GetQuickCampaignReportByDate(this.startDate, this.endDate).then((res: any) => {
        this.reportData.length = 0;
        this.reportData = res;
        this.listOfDisplayData = this.reportData;
        this.isLoading = false;
      }).catch(
        (err) => console.log(err)
      );
    }
    // campaign by id
    if (this.reportForm.controls[Constant.campaignType].value === Constant.reportCampaign
      && this.reportForm.controls[Constant.reportCampaignId].value != null) {
      this.reportService.GetCampaignReportById(this.reportForm.controls.CId.value).then((res: any) => {
        this.reportData.length = 0;
        this.reportData.push(res);
        this.listOfDisplayData = this.reportData;
        this.isLoading = false;

      }).catch(
        (err) => console.log(err)
      );
    }
    // quick-campaign by id
    if (this.reportForm.controls[Constant.campaignType].value === Constant.reportQuickCampaign
      && this.reportForm.controls[Constant.reportCampaignId].value != null) {
      this.reportService.GetQuickCampaignReportById(this.reportForm.controls.CId.value).then((res: any) => {
        this.reportData.length = 0;
        this.reportData.push(res);
        this.listOfDisplayData = this.reportData;
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
        this.listOfDisplayData = this.reportData;
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
        this.listOfDisplayData = this.reportData;
        this.isLoading = false;
      }).catch(
        (err) => console.log(err)
      );
    }
  }

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    if (this.reportForm.value.campaignType === 'campaign') {
      this.listOfDisplayData = this.reportData.filter(item =>
        item.CampaignName.toLowerCase().indexOf(this.searchValue.toLowerCase()) !== -1);
    } else {
      this.listOfDisplayData = this.reportData.filter((item) => item.QuickCampaignName.toLowerCase().indexOf(this.searchValue) !== -1);
    }
  }

  downloadPDF() {
    const doc = new jsPDF();
    const col = ['Campaign name', 'Positive', 'Negative', 'Neutral', 'No response', 'Success percentage', 'Success/Fail'];
    const rows = [];

    this.listOfDisplayData.forEach(element => {
      const innerRows = [];
      innerRows.push(element.CampaignName);
      innerRows.push(element.Positive);
      innerRows.push(element.Negative);
      innerRows.push(element.Neutral);
      innerRows.push(element.NoResponse);
      innerRows.push(element.percentageFor);
      innerRows.push(element.successOrNot ? 'Success' : 'Fail');
      rows.push(innerRows);
    });

    doc.autoTable(col, rows);
    doc.save('Report.pdf');
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

  downloadExcel() {
    const ws: XLSX.WorkSheet =
      XLSX.utils.table_to_sheet(this.excelData.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Customers');
    XLSX.writeFile(wb, 'Campaign.xlsx');
  }
}
