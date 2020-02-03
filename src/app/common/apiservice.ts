import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  post(path: string, body: any): Promise<any> {
    
    return this.http.post<any>(path, body).toPromise();
    
  }   
}