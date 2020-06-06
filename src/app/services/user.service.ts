import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Urls} from '../utils/urls';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private router: Router, private http: HttpClient) {
  }

  logoutUser() {
    this.router.navigate(['login']);
    localStorage.removeItem('user');
  }

  login(user: User) {
    return new Promise((resolve, reject) => {
      return this.http.post(Urls.login, user)
        .subscribe((res: any) => {
          resolve(res);
        }, err => {
          reject(err);
        });
    });
  }

  forgotPassword(emailId) {
    return new Promise((resolve, reject) => {
      return this.http.get(Urls.forgotPassword + emailId)
        .subscribe((res: any) => {
          resolve(res);
        }, err => {
          reject(err);
        });
    });
  }

  addNewUser(userData) {
    return new Promise((resolve, reject) => {
      return this.http.post(Urls.addUser, userData)
        .subscribe((res: any) => {
          resolve(res);
        }, err => {
          reject(err);
        });
    });
  }

  resetPassword(resetData) {
    return new Promise((resolve, reject) => {
      return this.http.get(Urls.resetPassword + '?email=' + resetData.email +
        '&cur_pwd=' + resetData.cur_pwd + '&new_pwd=' + resetData.new_pwd)
        .subscribe((res: any) => {
          resolve(res);
        }, err => {
          reject(err);
        });
    });
  }

  getUser() {
    return localStorage.getItem('user');
  }
}
