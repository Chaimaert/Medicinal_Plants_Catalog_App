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
  searchInput: string = ''; // For the single search input
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
      // Vérifiez si l'entrée correspond à une région
      if (plant.region.some(region => region.toLowerCase() === trimmedInput)) {
        return true;
      }
      // Vérifiez si l'entrée correspond à une propriété
      if (plant.properties && plant.properties.some(prop => prop.toLowerCase() === trimmedInput)) {
        return true;
      }
      // Vérifiez si l'entrée correspond à une utilisation
      if (plant.uses && plant.uses.some(use => use.toLowerCase() === trimmedInput)) {
        return true;
      }
      // Recherche par nom
      return plant.name.toLowerCase().includes(trimmedInput);
    });
  
    console.log('Filtered Plants:', this.filteredPlants); // Debug ici
    this.currentPage = 1; // Réinitialiser à la première page
  }

  viewPlantDetails(plantId: number): void {
    this.router.navigate(['/plant-details', plantId]); // Navigate to the plant details page
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
