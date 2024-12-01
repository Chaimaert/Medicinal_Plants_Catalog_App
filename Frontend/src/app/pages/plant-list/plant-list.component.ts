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
  searchLetter: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 8;
  plantResult: Plant | null = null;

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

  filterByLetter(letter: string): void {
    if (!letter) {
      this.filteredPlants = [...this.plants];
    } else {
      this.filteredPlants = this.plants.filter((plant) =>
        plant.name.toLowerCase().startsWith(letter.toLowerCase())
      );
    }
    this.currentPage = 1;
  }

  viewPlantDetails(plantId: number): void {
    this.router.navigate(['/plant-details', plantId]); // Navigates to a dynamic plant details route
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

