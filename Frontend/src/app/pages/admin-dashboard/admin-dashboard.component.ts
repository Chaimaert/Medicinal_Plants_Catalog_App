// admin-dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { PlantManagementService } from '../../services/plant-management.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  plants: any[] = []; // Initialisez comme un tableau vide

  constructor(
    private plantService: PlantManagementService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadPlants(); // Charge les plantes lors de l'initialisation
  }

  loadPlants() {
    this.plantService.getPlants().subscribe(data => {
      this.plants = data; // Affecte les données récupérées à la variable `plants`
    }, error => {
      console.error('Erreur lors de la récupération des plantes', error);
      // Vous pouvez afficher un message d'erreur à l'utilisateur ici
    });
  }

  // Navigate to add plant form
  addPlant() {
    this.router.navigate(['/admin/add-plant']); // Navigue vers la page d'ajout de plante
  }

  // Navigate to edit plant form (convert id to string)
  editPlant(id: number) {
    console.log('Edit button clicked, navigating to edit page with ID:', id); // Log pour le débogage
    this.router.navigate([`/admin/edit-plant/${id.toString()}`]); // Navigue vers la page d'édition de la plante
  }

  deletePlant(id: number) {
    // Display a confirmation popup
    const confirmDelete = window.confirm('Are you sure you want to delete this plant?');

    // If admin confirms, proceed with deletion
    if (confirmDelete) {
      this.plantService.deletePlant(id.toString()).subscribe(() => {
        // Filter the deleted plant from the list
        this.plants = this.plants.filter(plant => plant.id !== id);
        console.log('Plant deleted successfully!');
      }, error => {
        console.error('Error while deleting the plant', error);
        // Optionally show an error message to the admin
        alert('Failed to delete the plant. Please try again.');
      });
    } else {
      console.log('Deletion cancelled by the admin.');
    }
  }


  // Logout
  logout() {
    this.router.navigate(['/login']);
  }
}
