import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Urls} from '../utils/urls';
import { UserModel } from '../models/userModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http:HttpClient) { }

  getUsers(){
    return new Promise((resolve,reject)=>{
      return this.http.get(Urls.getUsersForRole)
      .subscribe((res:any)=>{
        resolve(res);
      },err=>{
        reject(err);
      });
    });
  }

  getUserById(id:number):Observable<UserModel> {
    return this.http.get<UserModel>(Urls.getUserById+id); 
  }

  
  updateAccess(userData) {
    return new Promise((resolve, reject) => {
      return this.http.put(Urls.updateUserAccess, userData)
        .subscribe((res: any) => {
          resolve(res);
        }, err => {
          reject(err);
        });
    });
  }

}