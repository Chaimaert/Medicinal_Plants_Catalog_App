import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecommendationService {
  private apiUrl = 'http://localhost:8080/plantes/recommandations';

  constructor(private http: HttpClient) {}

  getRecommendations(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }
}
