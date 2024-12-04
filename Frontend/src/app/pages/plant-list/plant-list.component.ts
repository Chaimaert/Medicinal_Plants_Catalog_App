import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlantService } from '../../services/plant.service';
import { Plant } from '../../models/plant.model';

@Component({
  selector: 'app-plant-list',
  templateUrl: './plant-list.component.html',
  styleUrls: ['./plant-list.component.css']
})
export class PlantListComponent implements OnInit {
  plants: Plant[] = [];
  filteredPlants: Plant[] = [];
  searchLetter: string = ''; // For search input
  currentPage: number = 1;
  itemsPerPage: number = 8;

  constructor(private router: Router, private plantService: PlantService) {}

  ngOnInit(): void {
    this.fetchPlants();
  }

  fetchPlants(): void {
    this.plantService.getPlants().subscribe((data: Plant[]) => {
      this.plants = data;
      this.filteredPlants = [...this.plants];
    });
  }

  searchPlants(): void {
    const searchParams = { nom: this.searchLetter }; // Assuming `nom` is the backend query param
    this.plantService.searchPlants(searchParams).subscribe(
      (data: Plant[]) => {
        this.filteredPlants = data;
        this.currentPage = 1;
      },
      (error) => {
        console.error('Error searching plants:', error);
      }
    );
  }

  viewPlantDetails(plantId: number): void {
    this.router.navigate(['/plant-details', plantId]); // Navigate to plant details page
  }

  getPaginatedPlants(): Plant[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredPlants.slice(startIndex, endIndex);
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    if (this.currentPage * this.itemsPerPage < this.filteredPlants.length) {
      this.currentPage++;
    }
  }
}
