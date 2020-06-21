import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Urls} from '../utils/urls';
import {UserModel} from '../models/userModel';
import {EncryptDecryptService} from './encrypt-decrypt.service';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  isLoading = false;
  userDetails: UserModel;
  getUserDataOnChange = new Subject();

  constructor(private router: Router, private http: HttpClient, private encryptDecryptService: EncryptDecryptService) {
  }

  logoutUser() {
    if (this.getIsRemember()) {
      localStorage.removeItem('userDetails');
      localStorage.removeItem('isRemember');
    } else {
      sessionStorage.removeItem('userDetails');
      localStorage.removeItem('isRemember');
    }
    this.router.navigate(['login']);
  }

  login(user: UserModel) {
    return new Promise((resolve, reject) => {
      return this.http.post(Urls.login, user)
        .subscribe((res: any) => {
          resolve(res);
        }, err => {
          reject(err);
        });
    });
  }

  getUser(email: string) {
    return new Promise((resolve, reject) => {
      return this.http.get(Urls.getUserByEmail + email)
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

  getUserName() {
    if (this.getIsRemember()) {
      const userData: UserModel = this.encryptDecryptService.decrypt(localStorage.getItem('userDetails'));
      return userData.FName + ' ' + userData.LName;
    } else {
      const userData: UserModel = this.encryptDecryptService.decrypt(sessionStorage.getItem('userDetails'));
      return userData.FName + ' ' + userData.LName;
    }
  }

  checkRoles() {
    if (this.getIsRemember()) {
      const userData: UserModel = this.encryptDecryptService.decrypt(localStorage.getItem('userDetails'));
      this.userDetails = userData;
      this.getUserDataOnChange.next(userData);
      return userData.Role;
    } else {
      const userData: UserModel = this.encryptDecryptService.decrypt(sessionStorage.getItem('userDetails'));
      this.userDetails = userData;
      this.getUserDataOnChange.next(userData);
      return userData.Role;
    }
  }

  getUserEmail() {
    if (this.getIsRemember()) {
      const userData: UserModel = this.encryptDecryptService.decrypt(localStorage.getItem('userDetails'));
      return userData.Email;
    } else {
      const userData: UserModel = this.encryptDecryptService.decrypt(sessionStorage.getItem('userDetails'));
      return userData.Email;
    }
  }

  getIsRemember() {
    return localStorage.getItem('isRemember') === 'true';
  }

  getUserDetails() {
    if (localStorage.getItem('userDetails')) {
      return this.encryptDecryptService.decrypt(localStorage.getItem('userDetails'));
    } else if (sessionStorage.getItem('userDetails')) {
      return this.encryptDecryptService.decrypt(sessionStorage.getItem('userDetails'));
    } else {
      return false;
    }
  }

  checkLogin() {
    if (localStorage.getItem('userDetails')) {
      this.router.navigate(['dashboard']);
    }
  }

  setUserData(userData, isRemember, type?) {
    localStorage.setItem('isRemember', isRemember);
    if (isRemember) {
      this.userDetails = userData;
      localStorage.setItem('userDetails', this.encryptDecryptService.encrypt(userData));
    } else {
      this.userDetails = userData;
      sessionStorage.setItem('userDetails', this.encryptDecryptService.encrypt(userData));
    }
    if (type !== 'dashboard') {
      this.router.navigate(['dashboard']);
    }
  }
}
