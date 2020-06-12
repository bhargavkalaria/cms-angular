import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { Report } from '../../models/Report.model';
import { reportService } from '../../services/report.service'
import { error } from '@angular/compiler/src/util';

@Component({
  selector: 'app-data-report',
  templateUrl: './data-report.component.html',
  styleUrls: ['./data-report.component.scss']
})
export class DataReportComponent implements OnInit {
  reportForm : FormGroup;
  dateFormat = 'MM/dd/yyyy';
  startDate;
  endDate;
  List= [];
  reportData= [];
  quickList= [];
  constructor(private router: Router,private formBuilder: FormBuilder,private _reportService:reportService) { 
    this.reportForm = this.formBuilder.group({
      CId:[null],
      campaignType: [null,Validators.required],
      range:[null]
    })
  }

  ngOnInit(): void {
  }
  
  

  dataChanged(data) {
    console.log(data)
    this.List.length =0
    this.quickList.length =0
    if(data === 'campaign')
    {
      this._reportService.getCampaigns().then((res:any)=>{
        this.List = res
        console.log(this.List.length)
        console.log(this.List)
      }).catch(
        (error)=>console.log(error)
      )
      console.log(this.List)
    }
    if(data === 'quick-campaign'){
      this._reportService.getQuickCampaigns().then((res:any)=>{
        this.quickList = res
        console.log(this.quickList.length)
        console.log(this.quickList)
      }).catch(
        (error)=>console.log(error)
      )
      console.log(this.List)
    }
  }

  Search():void{
    if(this.reportForm.controls['range'].value != null ) 
    {
      this.startDate=this.reportForm.controls['range'].value[0];
      this.endDate=this.reportForm.controls['range'].value[1];
    }
    //campaign by dates
    if(this.reportForm.controls['campaignType'].value == 'campaign' && this.startDate != null && this.endDate != null)
    {
      this._reportService.GetCampaignReportByDate(this.startDate,this.endDate).then((res:any)=>{
        console.log(res)
        this.reportData.length =0
        this.reportData= res
        console.log(this.reportData)
        console.log(this.reportData.length)
      }).catch(
        (err)=>console.log(err)
      )
    }
    //quick-campaign by dates
    if(this.reportForm.controls['campaignType'].value == 'quick-campaign' && this.startDate != null && this.endDate != null)
    {
      this._reportService.GetQuickCampaignReportByDate(this.startDate,this.endDate).then((res:any)=>{
        console.log(res)
        this.reportData.length =0
        this.reportData= res
      }).catch(
        (err)=>console.log(err)
      )
    }
    //campaign by id
    if(this.reportForm.controls['campaignType'].value == 'campaign' && this.reportForm.controls['CId'].value!= null )
    {
      this._reportService.GetCampaignReportById(this.reportForm.controls['CId'].value).then((res:any)=>{
        console.log(res)
          this.reportData.length =0
          this.reportData.push(res)
          console.log(this.reportData)
          console.log(this.reportData.length)
       
      }).catch(
        (err)=>console.log(err)
      )
    }
    //quick-campaign by id
    if(this.reportForm.controls['campaignType'].value == 'quick-campaign' && this.reportForm.controls['CId'].value!= null )
    {
      this._reportService.GetQuickCampaignReportById(this.reportForm.controls['CId'].value).then((res:any)=>{
        console.log(res)
        this.reportData.length =0
        this.reportData.push(res)
      }).catch(
        (err)=>console.log(err)
      )
    }
    //all campaigns
    if(this.reportForm.controls['campaignType'].value == 'campaign' && this.startDate == null && this.endDate == null
    && this.reportForm.controls['CId'].value == null)
    {
      this._reportService.GetCampaignReportByType().then((res:any)=>{
        console.log(res)
        this.reportData.length =0
        this.reportData= res
      }).catch(
        (err)=>console.log(err)
      )
    }
    //all quick-campaigns
    if(this.reportForm.controls['campaignType'].value == 'quick-campaign' && this.startDate == null && this.endDate == null
    && this.reportForm.controls['CId'].value == null)
    {
      this._reportService.GetQuickCampaignReportByType().then((res:any)=>{
        console.log(res)
        this.reportData.length =0
        this.reportData= res
      }).catch(
        (err)=>console.log(err)
      )
    }

  }

}
