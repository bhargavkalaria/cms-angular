import {Injectable} from '@angular/core';
import {Urls} from '../utils/urls';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {

  constructor(private http: HttpClient) {
  }

  getAllCampaign() {
    return new Promise((resolve, reject) => {
      return this.http.get(Urls.getAllCampaign)
        .subscribe((res: any) => {
          resolve(res);
        }, err => {
          reject(err);
        });
    });
  }

  postCampaign(campaign) {
    return new Promise((resolve, reject) => {
      return this.http.post(Urls.addCampaign, campaign)
        .subscribe((res: any) => {
          resolve(res);
        }, err => {
          reject(err);
        });
    });
  }

  updateCampaign(campaignData) {
    return new Promise((resolve, reject) => {
      return this.http.put(Urls.updateCampaign, campaignData)
        .subscribe((res: any) => {
          resolve(res);
        }, err => {
          reject(err);
        });
    });
  }

  getCampaignById(campaignId) {
    return new Promise((resolve, reject) => {
      return this.http.get(Urls.getCampaignById + campaignId)
        .subscribe((res: any) => {
          resolve(res);
        }, err => {
          reject(err);
        });
    });
  }

  getCustomerByCampaign(campaignId) {
    return new Promise((resolve, reject) => {
      return this.http.get(Urls.getCustomerByCampaign + campaignId)
        .subscribe((res: any) => {
          resolve(res);
        }, err => {
          reject(err);
        });
    });
  }

  getBrands() {
    return new Promise((resolve, reject) => {
      return this.http.get(Urls.getBrands)
        .subscribe((res: any) => {
          resolve(res);
        }, err => {
          reject(err);
        });
    });
  }

  getMarketingType() {
    return new Promise((resolve, reject) => {
      return this.http.get(Urls.getMarketingType)
        .subscribe((res: any) => {
          resolve(res);
        }, err => {
          reject(err);
        });
    });
  }

  getStrategy() {
    return new Promise((resolve, reject) => {
      return this.http.get(Urls.getStrategy)
        .subscribe((res: any) => {
          resolve(res);
        }, err => {
          reject(err);
        });
    });
  }

  getEmailTemplate() {
    return new Promise((resolve, reject) => {
      return this.http.get(Urls.getAllTemplate)
        .subscribe((res: any) => {
          resolve(res);
        }, err => {
          reject(err);
        });
    });
  }

  getCampaignStatus() {
    return new Promise((resolve, reject) => {
      return this.http.get(Urls.getCampaignStatus)
        .subscribe((res: any) => {
          resolve(res);
        }, err => {
          reject(err);
        });
    });
  }

  getCustomers() {
    return new Promise((resolve, reject) => {
      return this.http.get(Urls.getAllCustomers)
        .subscribe((res: any) => {
          resolve(res);
        }, err => {
          reject(err);
        });
    });
  }

  deleteCampaign(campaignId) {
    return new Promise((resolve, reject) => {
      return this.http.delete(Urls.deleteCampaign + campaignId)
        .subscribe((res: any) => {
          resolve(res);
        }, err => {
          reject(err);
        });
    });
  }


}
