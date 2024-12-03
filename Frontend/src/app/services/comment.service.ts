import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  
  private baseUrl = 'http://localhost:8080/plantes';

  constructor(private http: HttpClient) {}

  getCommentsByPlantId(plantId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${plantId}/commentaires`);
  }

  addComment(plantId: number, comment: any): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/${plantId}/commentaires`, comment);
  }
}
