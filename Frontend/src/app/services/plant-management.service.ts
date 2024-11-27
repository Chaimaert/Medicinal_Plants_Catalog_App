// plant-management.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlantManagementService {
  private apiUrl = 'http://localhost:8084/api/plants'; // Replace with your actual backend URL

  constructor(private http: HttpClient) {}

  // Method to get all plants
  getPlants(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Method to get a plant by ID
  getPlantById(plantId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${plantId}`);
  }

  // Method to add a new plant
  addPlant(plantData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, plantData);
  }

  // Method to update an existing plant
  editPlant(plantId: string, plantData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${plantId}`, plantData);
  }

  // Method to delete a plant
  deletePlant(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  
}
