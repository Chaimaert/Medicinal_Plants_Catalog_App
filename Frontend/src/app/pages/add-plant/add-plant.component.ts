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

  // Success message flag
  successMessage: string = '';

  // Method to handle file selection (Image and Video)
  onFileSelected(event: Event, type: 'images' | 'video') {
    const input = event.target as HTMLInputElement;
    const file = input.files ? input.files[0] : null;

    if (file) {
      if (type === 'images') {
        // Handle image file
        this.plantData.image = file;
      } else if (type === 'video') {
        // Handle video file
        this.plantData.video = file;
      }
    }
  }

  // Method to submit the form
  addPlant() {
    // Handle form submission logic
    console.log('Plant data:', this.plantData);
    
    // Simulating save logic (you can replace this with actual API logic)
    setTimeout(() => {
      // On successful save
      this.successMessage = 'Plant saved successfully!';
      // Optionally, clear the message after some time
      setTimeout(() => {
        this.successMessage = '';
      }, 3000);
    }, 500); // Simulating save delay
  }
}
