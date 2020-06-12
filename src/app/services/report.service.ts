import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Report } from '../models/Report.model'
import { Urls } from '../utils/urls'

@Injectable({
    providedIn: 'root'
})
export class reportService {
    constructor(private httpClient: HttpClient) { }
    getCampaigns() {
        return new Promise((resolve, reject) => {
            return this.httpClient.get(Urls.getAllCampaigns)
                .subscribe((res: any) => {
                    resolve(res)
                },
                    err => {
                        reject(err)
                    }
                )
        });
    }

    getQuickCampaigns() {
        return new Promise((resolve, reject) => {
            return this.httpClient.get(Urls.getAllQuickCampaigns)
                .subscribe((res: any) => {
                    resolve(res)
                },
                    err => {
                        reject(err)
                    }
                )
        });
    }

    GetCampaignReportByDate(start: Date, end: Date) {
        return new Promise((resolve, reject) => {
            return this.httpClient.get(Urls.GetCampaignReportByDate + '?StartDate=' +
                start.toDateString() + '&EndDate=' + end.toDateString())
                .subscribe((res: any) => {
                    resolve(res)
                },
                    err => {
                        reject(err)
                    }
                )
        });
    }

    GetQuickCampaignReportByDate(start: Date, end: Date) {
        return new Promise((resolve, reject) => {
            return this.httpClient.get(Urls.GetQuickCampaignReportByDate + '?StartDate=' +
                start.toDateString() + '&EndDate=' + end.toDateString())
                .subscribe((res: any) => {
                    resolve(res)
                },
                    err => {
                        reject(err)
                    }
                )
        });
    }

    GetCampaignReportById(id: number) {
        return new Promise((resolve, reject) => {
            return this.httpClient.get(Urls.GetCampaignReportById + id)
                .subscribe((res: any) => {
                    resolve(res)
                },
                    err => {
                        reject(err)
                    }
                )
        });
    }

    GetQuickCampaignReportById(id: number) {
        return new Promise((resolve, reject) => {
            return this.httpClient.get(Urls.GetQuickCampaignReportById + id)
                .subscribe((res: any) => {
                    resolve(res)
                },
                    err => {
                        reject(err)
                    }
                )
        });
    }

    GetCampaignReportByType() {
        return new Promise((resolve, reject) => {
            return this.httpClient.get(Urls.GetCampaignReportByType)
                .subscribe((res: any) => {
                    resolve(res)
                },
                    err => {
                        reject(err)
                    }
                )
        });
    }

    GetQuickCampaignReportByType() {
        return new Promise((resolve, reject) => {
            return this.httpClient.get(Urls.GetQuickCampaignReportByType)
                .subscribe((res: any) => {
                    resolve(res)
                },
                    err => {
                        reject(err)
                    }
                )
        });
    }
}