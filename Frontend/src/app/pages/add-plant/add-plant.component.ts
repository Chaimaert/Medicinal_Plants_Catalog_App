import { Component } from '@angular/core';
import { PlantManagementService } from '../../services/plant-management.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-plant',
  templateUrl: './add-plant.component.html',
  styleUrls: ['./add-plant.component.css']
})
export class AddPlantComponent {
  plantData = {
    name: '',
    description: '',
    articles: '',
    comments: '',
    precautions: '',
    properties: '',
    region: '',
    uses: '',
    image: null as File | null,
    video: null as File | null
  };

  successMessage: string = '';
  errorMessage: string = '';

  constructor(private plantManagementService: PlantManagementService, private router: Router) {}

  // Méthode pour soumettre le formulaire
  addPlant() {
    // Appeler le service pour envoyer les données
    this.plantManagementService.addPlant(this.plantData).subscribe({
      next: (response) => {
        this.successMessage = 'Plant added successfully!';
        this.errorMessage = '';
        // Réinitialiser les données du formulaire
        this.plantData = {
          name: '',
          description: '',
          articles: '',
          comments: '',
          precautions: '',
          properties: '',
          region: '',
          uses: '',
          image: null as File | null,
          video: null as File | null
        };
        // Redirection si nécessaire
        this.router.navigate(['/admin']); 
      },
      error: (err) => {
        console.error('Error adding plant:', err);
        this.errorMessage = 'Failed to add plant. Please try again.';
      }
    });
  }
}