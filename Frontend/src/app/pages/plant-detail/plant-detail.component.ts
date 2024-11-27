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
      image: 'assets/plant5.jpg',
      Description: 'Aloe vera is a succulent plant species...',
      precaution: 'Avoid excessive consumption.',
      articles: 'https://example.com/aloe-vera-articles',
      region: 'Africa, Asia',
      uses: 'Used for skin care, burns, and more.',
      video: 'assets/aloe-vera.mp4',
      properties: 'Anti-inflammatory, antimicrobial.',
      comments: ['Great for skin care!', 'Helps with burns.']
    };
    
    // Once backend is ready, replace the static data with a real HTTP call like:
    // this.plantService.getPlantById(plantId).subscribe(data => {
    //   this.plant = data;
    // });
  }

  addComment() {
    // Handle adding comment logic (e.g., updating the database)
    if (this.newCommentUsername && this.newCommentText) {
      this.plant.comments.push(this.newCommentText);
      this.newCommentUsername = '';
      this.newCommentText = '';
    }
  }
}
