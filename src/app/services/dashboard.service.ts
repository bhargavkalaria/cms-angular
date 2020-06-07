import {Injectable} from '@angular/core';
import {Urls} from '../utils/urls';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) {
  }

  getDashboardDetails() {
    return new Promise((resolve, reject) => {
      return this.http.get(Urls.getBasicDashBoardDetails)
        .subscribe((res: any) => {
          resolve(res);
        }, err => {
          reject(err);
        });
    });
  }

  getCampaignByMonth() {
    return new Promise((resolve, reject) => {
      return this.http.get(Urls.getCampaignByMonth)
        .subscribe((res: any) => {
          resolve(res);
        }, err => {
          reject(err);
        });
    });
  }

  getTopFiveBrandByBudget() {
    return new Promise((resolve, reject) => {
      return this.http.get(Urls.getTopFiveBrandByBudget)
        .subscribe((res: any) => {
          resolve(res);
        }, err => {
          reject(err);
        });
    });
  }

  getCampaignStatusList() {
    return new Promise((resolve, reject) => {
      return this.http.get(Urls.getCampaignStatusList)
        .subscribe((res: any) => {
          resolve(res);
        }, err => {
          reject(err);
        });
    });
  }

  getTopThreeResponse() {
    return new Promise((resolve, reject) => {
      return this.http.get(Urls.getTopThreeResponse)
        .subscribe((res: any) => {
          resolve(res);
        }, err => {
          reject(err);
        });
    });
  }
}
