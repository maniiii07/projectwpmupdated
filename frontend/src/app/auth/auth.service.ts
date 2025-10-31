import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private backendUrl = `${environment.backendUrl}/auth`;
  private tokenKey = 'auth_token';

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  // ✅ THIS IS THE MISSING FUNCTION
  signupUser(userData: any): Observable<any> {
    return this.http.post(`${this.backendUrl}/signup`, userData);
  }

  loginUser(credentials: any): Observable<any> {
    return this.http.post(`${this.backendUrl}/login`, credentials).pipe(
      tap((response: any) => {
        if (response && response.token) {
          if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem(this.tokenKey, response.token);
          }
        }
      })
    );
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(this.tokenKey);
    }
    return null;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.tokenKey);
    }
    this.router.navigate(['/home']);
  }

  isAdmin(): boolean {
      if (!isPlatformBrowser(this.platformId)) {
          return false;
      }
      const token = this.getToken();
      if (token) {
          const payload = JSON.parse(atob(token.split('.')[1]));
          return payload.role === 'admin';
      }
      return false;
  }
}