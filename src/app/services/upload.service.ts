import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Urls} from '../utils/urls';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient) {
  }

  UploadExcel(formData: FormData) {
    console.log(formData);
    const customHeader = new HttpHeaders();

    customHeader.append('Content-Type', 'multipart/form-data');
    customHeader.append('Accept', 'application/json');

    const httpOptions = {headers: customHeader};

    return new Promise((resolve, reject) => {
      return this.http.post(Urls.uploadCustomer, formData, httpOptions).subscribe((res: any) => {
        resolve(res);
      }, err => {
        reject(err);
      });
    });
  }
}
