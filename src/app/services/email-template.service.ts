import {Injectable} from '@angular/core';
import {Urls} from '../utils/urls';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmailTemplateService {

  constructor(private http: HttpClient) {
  }

  getEmailTemplate() {
    return new Promise((resolve, reject) => {
      return this.http.get(Urls.emailTemplateList)
        .subscribe((res: any) => {
          resolve(res);
        }, err => {
          reject(err);
        });
    });
  }

  getEmailTemplateById(templateId) {
    return new Promise((resolve, reject) => {
      return this.http.get(Urls.getEmailTemplateById + templateId)
        .subscribe((res: any) => {
          resolve(res);
        }, err => {
          reject(err);
        });
    });
  }

  addEmailTemplate(emailData) {
    return new Promise((resolve, reject) => {
      return this.http.post(Urls.addEmailTemplate, emailData)
        .subscribe((res: any) => {
          resolve(res);
        }, err => {
          reject(err);
        });
    });
  }

  updateEmailData(emailData) {
    return new Promise((resolve, reject) => {
      return this.http.put(Urls.updateEmailTemplate, emailData)
        .subscribe((res: any) => {
          resolve(res);
        }, err => {
          reject(err);
        });
    });
  }

  deleteEmailTemplate(id) {
    return new Promise((resolve, reject) => {
      return this.http.delete(Urls.deleteEmailTemplate + id)
        .subscribe((res: any) => {
          resolve(res);
        }, err => {
          reject(err);
        });
    });
  }
}
