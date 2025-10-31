import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod'; // <-- 1. IMPORT ENVIRONMENT

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // 2. USE THE ENVIRONMENT VARIABLE
  private backendUrl = `${environment.backendUrl}/users`; 

  constructor(private http: HttpClient) { }

  getUserProfile(): Observable<any> {
    return this.http.get(`${this.backendUrl}/profile`);
  }

  updateUserProfile(userData: any): Observable<any> {
    return this.http.put(`${this.backendUrl}/profile`, userData);
  }

  changePassword(passwords: any): Observable<any> {
    return this.http.put(`${this.backendUrl}/password`, passwords);
  }
}
