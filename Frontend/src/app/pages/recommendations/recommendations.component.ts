import { Component } from '@angular/core';

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.css']
})
export class RecommendationComponent {
  // Model for form data with French field names
  formData = {
    besoinsDeSante: '',  // Besoins de Santé
    preferences: '',      // Préférences
    antecedentsMedicaux: '' // Antécédents Médicaux
  };

  // Static plant result to display
  plantResult: any = null;

  // Static plant data with images
  staticPlants = [
    {
      name: 'Lavandar',
      properties: 'Apaisant, Relaxant',
      uses: 'Infusion, Huile essentielle',
      region: 'Méditerranée',
      image: 'assets/lavendar.jpg' // Static image URL for Lavande
    },
    {
      name: 'Camomille',
      properties: 'Calmante, Digestive',
      uses: 'Infusion, Huile essentielle',
      region: 'Europe, Asie',
      image: 'assets/plant7.jpg' // Static image URL for Camomille
    },
    {
      name: 'Menthe',
      properties: 'Revigorante, Digestive',
      uses: 'Infusion, Huile essentielle',
      region: 'Asie, Europe',
      image: 'assets/plant7.jpg' // Static image URL for Menthe
    }
  ];

  // Handle form submission
  submitForm() {
    // Conditional logic to display a specific plant based on form inputs
    if (
      this.formData.besoinsDeSante === 'Stress' &&
      this.formData.preferences === 'Plantes locales' &&
      this.formData.antecedentsMedicaux === 'Allergies'
    ) {
      // Return a specific plant (Lavande) if the conditions match
      this.plantResult = this.staticPlants[0]; // Example: Lavande
    } else if (
      this.formData.besoinsDeSante === 'Digestion' &&
      this.formData.preferences === 'Plantes européennes' &&
      this.formData.antecedentsMedicaux === 'Aucune'
    ) {
      // Return a different plant (Camomille) for another set of conditions
      this.plantResult = this.staticPlants[1]; // Example: Camomille
    } else if (
      this.formData.besoinsDeSante === 'Énergie' &&
      this.formData.preferences === 'Plantes asiatiques' &&
      this.formData.antecedentsMedicaux === 'Asthme'
    ) {
      // Return a different plant (Menthe) for another set of conditions
      this.plantResult = this.staticPlants[2]; // Example: Menthe
    } else {
      this.plantResult = null; // No result if no conditions match
    }
  }
}
