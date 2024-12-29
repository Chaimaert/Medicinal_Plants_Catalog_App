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
  searchInput: string = '';
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
    const trimmedInput = this.searchInput.trim().toLowerCase();
    this.filteredPlants = this.plants.filter(plant => {
      if (plant.region.some(region => region.toLowerCase() === trimmedInput)) {
        return true;
      }
      if (plant.properties && plant.properties.some(prop => prop.toLowerCase() === trimmedInput)) {
        return true;
      }
      if (plant.uses && plant.uses.some(use => use.toLowerCase() === trimmedInput)) {
        return true;
      }
      // Recherche par nom
      return plant.name.toLowerCase().includes(trimmedInput);
    });

    console.log('Filtered Plants:', this.filteredPlants);
    this.currentPage = 1;
  }

  viewPlantDetails(plantId: number): void {
    this.router.navigate(['/plant-details', plantId]); 
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
