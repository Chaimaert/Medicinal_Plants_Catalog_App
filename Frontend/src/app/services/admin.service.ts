import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'http://localhost:8080/admin/plantes';

  constructor(private http: HttpClient) {}

  // Get plants from the backend
  getPlants(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      catchError(error => {
        console.error('Error fetching plants:', error);
        throw error;
      })
    );
  }

  // Delete a plant by ID
  deletePlant(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        console.error('Error deleting plant:', error);
        throw error;
      })
    );
  }

  // Add a new plant
  addPlant(plant: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, plant).pipe(
      catchError(error => {
        console.error('Error adding plant:', error);
        throw error;
      })
    );
  }

  // Update a plant
  updatePlant(id: number, plant: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, plant).pipe(
      catchError(error => {
        console.error('Error updating plant:', error);
        throw error;
      })
    );
  }
}
