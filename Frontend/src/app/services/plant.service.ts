// src/app/services/plant.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Plant } from '../models/plant.model';

@Injectable({
  providedIn: 'root'
})
export class PlantService {
  private apiUrl = 'http://localhost:8084/api/plants'; // Adjust the URL to your backend

  constructor(private http: HttpClient) {}

  // Get all plants from the backend
  getAllPlants(): Observable<Plant[]> {
    return this.http.get<Plant[]>(this.apiUrl);
  }

  // Get plants by name, filter by first letter
  getPlantsByLetter(letter: string): Observable<Plant[]> {
    return this.http.get<Plant[]>(`${this.apiUrl}?letter=${letter}`);
  }
}
