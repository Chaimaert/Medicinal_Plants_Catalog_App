import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Plant } from '../models/plant.model';

@Injectable({
  providedIn: 'root',
})
export class PlantService {
  private apiUrl = 'http://localhost:8080'; //  backend URL

  constructor(private http: HttpClient) {}

  // Fetch all plants
  getPlants(): Observable<Plant[]> {
    return this.http.get<Plant[]>(`${this.apiUrl}/plantes`);
  }

  // Fetch plant details by ID
  getPlantById(id: number): Observable<Plant> {
    return this.http.get<Plant>(`${this.apiUrl}/plantes/${id}`);
  }

  // search plants
  searchPlants(searchParams: any): Observable<Plant[]> {
    return this.http.get<Plant[]>(`${this.apiUrl}/plantes/recherche-avancee`, { params: searchParams });

  }

  // Add a new comment
  addComment(
    plantId: number,
    comment: { username: string; text: string }
  ): Observable<any> {
    return this.http.post(`${this.apiUrl}/plantes/${plantId}/commentaires`, comment);
  }
}
