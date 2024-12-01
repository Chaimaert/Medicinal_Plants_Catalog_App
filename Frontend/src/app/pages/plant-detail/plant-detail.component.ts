import { Component, OnInit } from '@angular/core';
import { PlantService } from '../../services/plant.service'; // import the service

@Component({
  selector: 'app-plant-details',
  templateUrl: './plant-detail.component.html',
  styleUrls: ['./plant-detail.component.css']
})
export class PlantDetailsComponent implements OnInit {
  plant: any; // To store plant data fetched from API
  newCommentUsername: string = '';
  newCommentText: string = '';

  constructor(private plantService: PlantService) {}

  ngOnInit(): void {
    // Simulate fetching data from backend
    this.getPlantDetails(); // Replace with actual API call when backend is ready
  }

  getPlantDetails() {
    // Simulated static data for now
    this.plant = {
      name: 'Aloe Vera',
      image: 'assets/AV.jpg',
      Description: 'Aloe vera est une espèce en région méditerranéenne, en Afrique du Nord, aux îles Canaries et au Cap-Vert.',
      precaution: 'Avoid excessive consumption .Conserver au réfrigérateur.  Éviter sur la peau irritée ou abîmée',
      articles: 'https://www.dieti-natura.com/plantes-actifs/aloe-vera.html',
      region: 'Africa, Asia',
      uses: 'Used for skin care, burns, and more.',
      video: 'assets/Av.mp4',
      properties: 'Anti-inflammatory, antimicrobial.',
      comments: [
        { username: 'Inass', text: 'Great for skin care!' },
        { username: 'Leila', text: 'Helps with burns.' }
      ]
    };
  }

  addComment() {
    // Handle adding comment logic (e.g., updating the database)
    if (this.newCommentUsername && this.newCommentText) {
      this.plant.comments.push({
        username: this.newCommentUsername,
        text: this.newCommentText
      });
      this.newCommentUsername = '';
      this.newCommentText = '';
    }
  }
}
