import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecommendationService {
  // private apiUrl = 'http://localhost:8080/plantes/recommandations';

  constructor(private http: HttpClient) {}

  getRecommendations(data: any): Observable<any> {
    const headers = {
      'Content-Type': 'application/json'
    };
    return this.http.post<any>('http://localhost:8080/plantes/recommandations', data, { headers });
  }

}
