import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'https://your-backend-url/api/plants'; // Replace with your actual API endpoint

  constructor(private http: HttpClient) {}

  // Get plants from the backend
  getPlants(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Delete a plant by ID
  deletePlant(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Add a new plant (example, adjust if needed)
  addPlant(plant: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, plant);
  }

  // Update a plant (example, adjust if needed)
  updatePlant(id: number, plant: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, plant);
  }
}
