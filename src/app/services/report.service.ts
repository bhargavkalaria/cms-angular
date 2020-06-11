import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { HttpClient , HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Report } from '../models/Report.model'

@Injectable({
    providedIn: 'root'
})
export class reportService{
    constructor(private httpClient: HttpClient){}
    url= "https://localhost:44308/api/";

    getCampaigns(){
        return new Promise((resolve,reject)=>{
            return this.httpClient.get(this.url+"CampaignApi/GetAllCampaigns")
            .subscribe((res:any)=>{
                resolve(res)
            },
           err=>{
                reject(err)
           }
            )
        });
    }

    getQuickCampaigns(){
        return new Promise((resolve,reject)=>{
            return this.httpClient.get(this.url+"QuickCampaignApi/GetAllQuickCampaigns")
            .subscribe((res:any)=>{
                resolve(res)
            },
           err=>{
                reject(err)
           }
            )
        });
    }

    GetCampaignReportByDate(start:Date,end:Date){
        return new Promise((resolve,reject)=>{
            return this.httpClient.get(this.url+"ReportApi/GetCampaignReportByDate?StartDate="+
           start.toDateString()+"&EndDate="+end.toDateString()
            )
            .subscribe((res:any)=>{
                resolve(res)
            },
           err=>{
                reject(err)
           }
            )
        });

    }

    GetQuickCampaignReportByDate(start:Date,end:Date){
        return new Promise((resolve,reject)=>{
            return this.httpClient.get(this.url+"ReportApi/GetQuickCampaignReportByDate?StartDate="+
            start.toDateString()+"&EndDate="+end.toDateString()
            )
            .subscribe((res:any)=>{
                resolve(res)
            },
           err=>{
                reject(err)
           }
            )
        });

    }

    GetCampaignReportById(id:number){
        return new Promise((resolve,reject)=>{
            return this.httpClient.get(this.url+"ReportApi/GetCampaignReportById?id="+id
            )
            .subscribe((res:any)=>{
                resolve(res)
            },
           err=>{
                reject(err)
           }
            )
        });

    }

    GetQuickCampaignReportById(id:number){
        return new Promise((resolve,reject)=>{
            return this.httpClient.get(this.url+"ReportApi/GetQuickCampaignReportById?id="+id
            )
            .subscribe((res:any)=>{
                resolve(res)
            },
           err=>{
                reject(err)
           }
            )
        });

    }

    GetCampaignReportByType(){
        return new Promise((resolve,reject)=>{
            return this.httpClient.get(this.url+"ReportApi/GetCampaignReportByType"
            )
            .subscribe((res:any)=>{
                resolve(res)
            },
           err=>{
                reject(err)
           }
            )
        });
    }

    GetQuickCampaignReportByType(){
        return new Promise((resolve,reject)=>{
            return this.httpClient.get(this.url+"ReportApi/GetQuickCampaignReportByType"
            )
            .subscribe((res:any)=>{
                resolve(res)
            },
           err=>{
                reject(err)
           }
            )
        });
    }

}