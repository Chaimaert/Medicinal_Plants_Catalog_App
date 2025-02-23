import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlantManagementService } from '../../services/plant-management.service';

@Component({
  selector: 'app-edit-plant',
  templateUrl: './edit-plant.component.html',
  styleUrls: ['./edit-plant.component.css']
})
export class EditPlantComponent implements OnInit {
  plantData: any = {
    id: null,
    name: '',
    description: '',
    articles: [],
    images: '',  // Pour gérer les fichiers d'image
    interactions: [],
    precautions: [],
    properties: [],
    region: [],
    uses: [],
    video: '',  // Pour gérer les fichiers vidéo
  };

  constructor(
    private plantService: PlantManagementService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const plantId = this.route.snapshot.paramMap.get('id');
    if (plantId) {
      this.plantService.getPlantById(plantId).subscribe(data => {
        this.plantData = data;  // Remplit le formulaire avec les données de la plante
      }, error => {
        console.error('Erreur lors de la récupération des données de la plante', error);
      });
    }
  }

  // Gérer l'envoi du formulaire
  editPlant() {
    const plantId = this.route.snapshot.paramMap.get('id');
    if (plantId) {
      console.log('Données à envoyer :', this.plantData); // Log pour débogage
      this.plantService.editPlant(plantId, this.plantData).subscribe(
        () => {
          this.router.navigate(['/admin']); // Redirige après la mise à jour
        },
        error => {
          console.error('Erreur lors de la mise à jour de la plante', error);
        }
      );
    }
  }

  // Ajouter un nouvel article à la liste
  addArticle() {
    this.plantData.articles.push('');
  }

  // Supprimer un article de la liste
  removeArticle(index: number) {
    this.plantData.articles.splice(index, 1);
  }

  // Ajouter une interaction à la liste
  addInteraction() {
    this.plantData.interactions.push('');
  }

  // Supprimer une interaction de la liste
  removeInteraction(index: number) {
    this.plantData.interactions.splice(index, 1);
  }

  // Ajouter une précaution à la liste
  addPrecaution() {
    this.plantData.precautions.push('');
  }

  // Supprimer une précaution de la liste
  removePrecaution(index: number) {
    this.plantData.precautions.splice(index, 1);
  }

  // Ajouter une propriété à la liste
  addProperty() {
    this.plantData.properties.push('');
  }

  // Supprimer une propriété de la liste
  removeProperty(index: number) {
    this.plantData.properties.splice(index, 1);
  }

  // Ajouter une région à la liste
  addRegion() {
    this.plantData.region.push('');
  }

  // Supprimer une région de la liste
  removeRegion(index: number) {
    this.plantData.region.splice(index, 1);
  }

  // Ajouter une utilisation à la liste
  addUse() {
    this.plantData.uses.push('');
  }

  // Supprimer une utilisation de la liste
  removeUse(index: number) {
    this.plantData.uses.splice(index, 1);
  }

  // Gérer le téléchargement de fichiers pour les images et les vidéos
  onFileSelected(event: any, field: string) {
    const file = event.target.files[0];
    if (file) {
      // Traitement du fichier (par exemple, conversion en base64 ou téléchargement sur le serveur)
      if (field === 'images') {
        this.plantData.images = file; // Vous pouvez également gérer plusieurs fichiers ici
      } else if (field === 'video') {
        this.plantData.video = file;
      }
    }
  }
}