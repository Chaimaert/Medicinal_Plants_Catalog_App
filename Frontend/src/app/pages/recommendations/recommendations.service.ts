import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecommendationService {
  private apiUrl = 'http://localhost:8084/api/recommendations'; // Your backend API URL

  constructor(private http: HttpClient) {}

  // Method to get recommendations based on user input
  getRecommendations(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/get`, data);
  }
}
