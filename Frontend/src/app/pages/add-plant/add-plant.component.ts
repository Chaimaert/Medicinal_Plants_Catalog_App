import { Component } from '@angular/core';
import { PlantManagementService } from '../../services/plant-management.service';

@Component({
  selector: 'app-add-plant',
  templateUrl: './add-plant.component.html',
  styleUrls: ['./add-plant.component.css'],
})
export class AddPlantComponent {
  // Initialize form data object
  plantData: any = {
    name: '',
    description: '',
    properties: '',
    uses: '',
    region: '',
    precautions: '',
    interactions: '',
    images: '',
    articles: '',
    videos: '',
  };

  successMessage = '';
  errorMessage = '';

  constructor(private plantService: PlantManagementService) {}

  // Format and submit plant data
  addPlant(): void {
    const formattedData = {
      name: this.plantData.name,
      description: this.plantData.description,
      properties: this.plantData.properties.split(','), 
      uses: this.plantData.uses.split(','),
      region: this.plantData.region.split(','),
      precautions: this.plantData.precautions.split(','),
      interactions: this.plantData.interactions.split(','),
      images: this.plantData.images.split(','),
      articles: this.plantData.articles.split(','),
      videos: this.plantData.videos.split(','),
    };

    this.plantService.addPlant(formattedData).subscribe(
      () => {
        this.successMessage = 'Plant added successfully!';
        this.errorMessage = '';
      },
      (error) => {
        console.error('Error adding plant:', error);
        this.errorMessage = 'Failed to add plant. Please try again.';
        this.successMessage = '';
      }
    );
  }
}
