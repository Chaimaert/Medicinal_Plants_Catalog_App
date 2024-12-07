import { Component } from '@angular/core';
import { RecommendationService } from '../../services/recommendations.service';

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.css'],
})
export class RecommendationsComponent {
  formData = {
    besoinDeSante: '',
    preferences: '',
    antecedentsMedicaux: '',
  };

  plantResult: any = null;
  errorMessage: string = '';

  constructor(private recommendationService: RecommendationService) {}

  submitForm() {
    // Validation des champs obligatoires
    if (!this.formData.besoinDeSante.trim()) {
      this.errorMessage = 'Le champ "Besoins de Santé" est obligatoire.';
      return;
    }

    // Préparer les données pour la requête
    const requestData = {
      besoinDeSante: this.formData.besoinDeSante.trim(),
      preferences: this.formData.preferences
        ? this.formData.preferences.split(',')
        : [],
      antecedentsMedicaux: this.formData.antecedentsMedicaux
        ? this.formData.antecedentsMedicaux.split(',')
        : [],
    };

    // Appeler le service pour obtenir les recommandations
    this.recommendationService.getRecommendations(requestData).subscribe(
      (response) => {
        if (response && response.length > 0) {
          this.plantResult = response;
          this.errorMessage = '';
        } else {
          this.errorMessage =
            'Aucune recommandation trouvée pour les besoins de santé spécifiés.';
        }
      },
      (error) => {
        console.error('Erreur lors de la récupération des recommandations:', error);
        this.errorMessage =
          'Une erreur est survenue lors de la récupération des recommandations.';
      }
    );
  }
}
