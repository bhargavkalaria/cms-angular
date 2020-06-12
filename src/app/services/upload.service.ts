import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Urls} from '../utils/urls';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient) {
  }

  uploadExcel(customerData) {
    return new Promise((resolve, reject) => {
      return this.http.post(Urls.uploadCustomer, customerData).subscribe((res: any) => {
        resolve(res);
      }, err => {
        reject(err);
      });
    });
  }
}
