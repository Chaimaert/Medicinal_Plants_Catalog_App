import { Component } from '@angular/core';
import { PlantManagementService } from '../../services/plant-management.service';
import { Router } from '@angular/router';

import { AdminService } from '../../services/admin.service';

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
  errorMessage: string = ''; // Pour gérer les erreurs

  constructor(private adminService: AdminService) {}

  // Méthode pour gérer la sélection des fichiers
  onFileSelected(event: Event, type: 'images' | 'video') {
    const input = event.target as HTMLInputElement;
    const file = input.files ? input.files[0] : null;

    if (file) {
      if (type === 'images') {
        this.plantData.image = file;
      } else if (type === 'video') {
        this.plantData.video = file;
      }
    }
  }

  // Méthode pour soumettre le formulaire
  addPlant() {
    const formData = new FormData();

    // Ajouter les champs au FormData
    formData.append('name', this.plantData.name);
    formData.append('description', this.plantData.description);
    formData.append('articles', this.plantData.articles);
    formData.append('comments', this.plantData.comments);
    formData.append('precautions', this.plantData.precautions);
    formData.append('properties', this.plantData.properties);
    formData.append('region', this.plantData.region);
    formData.append('uses', this.plantData.uses);

    if (this.plantData.image) {
      formData.append('image', this.plantData.image);
    }

    if (this.plantData.video) {
      formData.append('video', this.plantData.video);
    }

    // Appeler le service pour envoyer les données
    this.adminService.addPlant(formData).subscribe({
      next: () => {
        this.successMessage = 'Plant added successfully!';
        this.errorMessage = ''; // Réinitialiser les erreurs
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
          image: null,
          video: null
        };
      },
      error: (err) => {
        console.error('Error adding plant:', err);
        this.errorMessage = 'Failed to add plant. Please try again.';
      }
    });
  }
}
