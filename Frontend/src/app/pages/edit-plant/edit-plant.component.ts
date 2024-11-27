import { Component, OnInit } from '@angular/core';
import { PlantManagementService } from '../../services/plant-management.service';
import { ActivatedRoute, Router } from '@angular/router';

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
    comments: [],
    images: '',  // To hold the file input for image URLs or base64
    interactions: [],
    precautions: [],
    properties: [],
    region: [],
    uses: [],
    video: '',  // For the video file input
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
        this.plantData = data;  // Populate form with plant data
      });
    }
  }

  // Handle form submission
  editPlant() {
    const plantId = this.route.snapshot.paramMap.get('id');
    if (plantId) {
      this.plantService.editPlant(plantId, this.plantData).subscribe(() => {
        this.router.navigate(['/admin']); // Redirect to the dashboard
      });
    }
  }

  addArticle() {
    this.plantData.articles.push('');
  }
  
  removeArticle(index: number) {
    this.plantData.articles.splice(index, 1);
  }
  

  // Handle file upload for images and videos
  onFileSelected(event: any, field: string) {
    const file = event.target.files[0];
    if (file) {
      // Handle file upload (e.g., convert to base64 or upload to server)
      if (field === 'images') {
        this.plantData.images = file;
      } else if (field === 'video') {
        this.plantData.video = file;
      }
    }
  }
}
