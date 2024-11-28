import { Component, OnInit } from '@angular/core';
import { PlantService } from '../../services/plant.service';
import { Plant } from '../../models/plant.model';

@Component({
  selector: 'app-plant-list',
  templateUrl: './plant-list.component.html',
  styleUrls: ['./plant-list.component.css'],
})
export class PlantListComponent implements OnInit {
  plants: Plant[] = [];
  errorMessage: string = '';

  constructor(private plantService: PlantService) {}

  ngOnInit(): void {
    this.fetchPlants();
  }

  fetchPlants(): void {
    this.plantService.getAllPlants().subscribe({
      next: (data) => {
        console.log('Fetched plants:', data);
        this.plants = data;
      },
      error: (err) => {
        console.error('Error fetching plants:', err);
        this.errorMessage = 'Unable to fetch plants. Please try again later.';
      },
    });
  }
}
