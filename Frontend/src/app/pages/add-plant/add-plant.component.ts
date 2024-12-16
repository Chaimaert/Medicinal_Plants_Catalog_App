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

  // Method to handle file selection
  onFileSelected(event: Event, type: string): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      if (type === 'image') {
        this.plantData.image = file; // Store the selected image
      } else if (type === 'video') {
        this.plantData.video = file; // Store the selected video
      }
      console.log(`Selected ${type} file:`, file);
    }
  }

  // Method to submit the form
  addPlant() {
    this.plantManagementService.addPlant(this.plantData).subscribe({
      next: (response) => {
        this.successMessage = 'Plant added successfully!';
        this.errorMessage = '';
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
        this.router.navigate(['/admin']);
      },
      error: (err) => {
        console.error('Error adding plant:', err);
        this.errorMessage = 'Failed to add plant. Please try again.';
      }
    });
  }
}