import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private backendUrl = `${environment.backendUrl}/admin`;

  constructor(private http: HttpClient) { }

  // ✅ ADD THIS FUNCTION
  adminLogin(credentials: any): Observable<any> {
    return this.http.post(`${this.backendUrl}/login`, credentials);
  }

  getAllUsers(): Observable<any> {
    return this.http.get(`${this.backendUrl}/users`);
  }

  deleteItem(itemId: string): Observable<any> {
    return this.http.delete(`${this.backendUrl}/items/${itemId}`);
  }
}