import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { HttpClient , HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Brand } from '../models/brand.model'

@Injectable({
    providedIn: 'root'
})
export class brandService{
    constructor(private httpClient: HttpClient) {
    }
    url= "https://localhost:44308/api/BrandApi/";

    getBrands(){
        return new Promise((resolve,reject)=>{
            return this.httpClient.get(this.url+"GetAllBrands")
            .subscribe((res:any)=>{
                resolve(res)
            },
           err=>{
                reject(err)
           }
            )
        });
    }

    getBrandById(id : number): Observable<Brand> {
        return this.httpClient.get<Brand>(`${this.url+'GetBrand'}/${id}`); 
    }

    Add(data: Brand) :Observable<void>
    {
      return this.httpClient.post<void>(this.url+"InsertBrand", data, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }
        );  
    }

    Update(data: Brand) 
    {
        return new Promise((resolve,reject)=>{
            return this.httpClient.put<void>(`${this.url+'UpdateBrand'}`, data, {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json'
                })
            }
            ).subscribe((res:any)=>{
                resolve(res)
            },
            
            err => {
                reject(err)
                console.log(err)
            }
            )
        })
   
    }

    Delete(id : number): Observable<void> {
        return this.httpClient.delete<void>(`${this.url+'DeleteBrand/'}/${id}`); 
    }


}
