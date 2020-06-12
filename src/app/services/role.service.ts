import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Urls} from '../utils/urls';

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

  getUserById(id:number){
    return new Promise((resolve,reject)=>{
      return this.http.get(Urls.getUserById+id)
      .subscribe((res:any)=>{
        resolve(res);
      },err=>{
        reject(err);
      });
    });
  }

}
