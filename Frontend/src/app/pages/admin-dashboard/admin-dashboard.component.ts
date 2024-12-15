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

  // Delete plant
  deletePlant(id: number) {
    this.plantService.deletePlant(id.toString()).subscribe(() => {
      this.plants = this.plants.filter(plant => plant.id !== id); // Met à jour la liste après suppression
    }, error => {
      console.error('Erreur lors de la suppression de la plante', error);
      // Gérer l'erreur ici si nécessaire
    });
  }

  // Logout
  logout() {
    // Ici vous pouvez appeler la méthode de déconnexion de votre backend si nécessaire
    this.router.navigate(['/login']); // Navigue vers la page de connexion
  }
}