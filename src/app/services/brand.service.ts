import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Urls} from '../utils/urls';
import {BrandModel} from '../models/brandModel';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  constructor(private httpClient: HttpClient) {
  }

  getBrands() {
    return new Promise((resolve, reject) => {
      return this.httpClient.get(Urls.getBrands)
        .subscribe((res: any) => {
          resolve(res);
        }, err => {
          reject(err);
        });
    });
  }

  getBrandById(id: number) {
    return new Promise((resolve, reject) => {
      return this.httpClient.get<BrandModel>(Urls.getBrandById + id)
        .subscribe((res: any) => {
          resolve(res);
        }, err => {
          reject(err);
        });
    });
  }

  Add(data) {
    return new Promise((resolve, reject) => {
      return this.httpClient.post(Urls.addBrand, data)
        .subscribe((res: any) => {
          resolve(res);
          console.log(res);
        }, err => {
          reject(err);
          console.log(err);
        });
    });
  }

  Update(data) {
    return new Promise((resolve, reject) => {
      return this.httpClient.put(Urls.updateBrand, data).subscribe((res: any) => {
        resolve(res);
        console.log(res);
      }, err => {
        reject(err);
        console.log(err);
      });
    });
  }

  Delete(id) {
    return new Promise((resolve, reject) => {
      return this.httpClient.delete(Urls.deleteBrand + id)
        .subscribe((res: any) => {
          resolve(res);
        }, err => {
          reject(err);
        });
    });
  }

}
