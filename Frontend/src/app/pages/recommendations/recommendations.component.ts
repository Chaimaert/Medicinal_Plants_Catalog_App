import { Component } from '@angular/core';
import { RecommendationService } from '../../services/recommendations.service';

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.css']
})
export class RecommendationComponent {
  // Model for form data
  formData = {
    besoinsDeSante: '',  // Required field
    preferences: '',     // Optional
    antecedentsMedicaux: '' // Optional
  };

  plantResult: any = null; 

  constructor(private recommendationService: RecommendationService) {}

  // Handle form submission
  submitForm() {
    if (!this.formData.besoinsDeSante.trim()) {
      alert('Besoins de Santé is a required field.');
      return;
    }

    // Call the backend API to fetch recommendations
    this.recommendationService.getRecommendations(this.formData).subscribe(
      (response) => {
        this.plantResult = response;
      },
      (error) => {
        console.error('Error fetching recommendations:', error);
      }
    );
  }
}
