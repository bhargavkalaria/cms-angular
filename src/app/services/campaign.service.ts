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
}
