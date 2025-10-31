import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod'; // <-- 1. IMPORT ENVIRONMENT

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  // 2. USE THE ENVIRONMENT VARIABLE
  private backendUrl = environment.backendUrl; 

  constructor(private http: HttpClient) { }

  getItems(searchTerm: string = ''): Observable<any> {
    let params = new HttpParams();
    if (searchTerm) {
      params = params.append('search', searchTerm);
    }
    return this.http.get(`${this.backendUrl}/items`, { params: params });
  }

  postItem(formData: FormData): Observable<any> {
    return this.http.post(`${this.backendUrl}/items`, formData);
  }

  submitClaim(itemId: string, message: string): Observable<any> {
    return this.http.post(`${this.backendUrl}/items/${itemId}/claims`, { message });
  }

  getMyItems(): Observable<any> {
    return this.http.get(`${this.backendUrl}/items/my-items`);
  }

  getClaimsForItem(itemId: string): Observable<any> {
    return this.http.get(`${this.backendUrl}/items/${itemId}/claims`);
  }

  updateClaimStatus(claimId: string, status: string): Observable<any> {
    return this.http.patch(`${this.backendUrl}/claims/${claimId}`, { status });
  }

  getMyClaims(): Observable<any> {
    return this.http.get(`${this.backendUrl}/claims/my-claims`);
  }

  deleteItem(itemId: string): Observable<any> {
    return this.http.delete(`${this.backendUrl}/items/${itemId}`);
  }

  updateItemPhoto(itemId: string, photo: File): Observable<any> {
    const formData = new FormData();
    formData.append('photo', photo, photo.name);
    return this.http.patch(`${this.backendUrl}/items/${itemId}/photo`, formData);
  }
}
