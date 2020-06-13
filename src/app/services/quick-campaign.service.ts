import {Injectable} from '@angular/core';
import {Urls} from '../utils/urls';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuickCampaignService {

  constructor(private httpClient: HttpClient) {
  }

  getQuickCampaignList() {
    return new Promise((resolve, reject) => {
      return this.httpClient.get(Urls.getQuickCampaignList)
        .subscribe((res: any) => {
            resolve(res);
          },
          err => {
            reject(err);
          }
        );
    });
  }

  addCampaignList(quickCampaignData) {
    return new Promise((resolve, reject) => {
      return this.httpClient.post(Urls.addQuickCampaign, quickCampaignData)
        .subscribe((res: any) => {
            resolve(res);
          },
          err => {
            reject(err);
          }
        );
    });
  }
}
