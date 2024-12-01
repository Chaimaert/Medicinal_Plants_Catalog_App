import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // Import for route parameters
import { PlantService } from '../../services/plant.service'; // Import the service

@Component({
  selector: 'app-plant-details',
  templateUrl: './plant-detail.component.html',
  styleUrls: ['./plant-detail.component.css']
})
export class PlantDetailsComponent implements OnInit {
  plant: any; // To store fetched plant data
  newCommentUsername: string = '';
  newCommentText: string = '';

  constructor(
    private plantService: PlantService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Get plant ID from route and fetch details
    const plantId = this.route.snapshot.paramMap.get('id');
    if (plantId) {
      this.getPlantDetails(+plantId);
    }
  }

  getPlantDetails(id: number): void {
    console.log('Fetching details for plant ID:', id); // Debugging
    this.plantService.getPlantById(id).subscribe(
      (data) => {
        console.log('Fetched Plant Details:', data); // Debugging
        this.plant = data;
        console.log('Images:', this.plant.images); // Debugging
        console.log('Videos:', this.plant.videos); // Debugging
      },
      (error) => {
        console.error('Error fetching plant details:', error);
      }
    );
  }


  addComment() {
    if (this.newCommentUsername && this.newCommentText) {
      const newComment = { username: this.newCommentUsername, text: this.newCommentText };

      // Call service to save comment to backend
      this.plantService.addComment(this.plant.id, newComment).subscribe(
        () => {
          this.plant.comments.push(newComment);
          this.newCommentUsername = '';
          this.newCommentText = '';
        },
        (error) => {
          console.error('Error adding comment:', error);
        }
      );
    }
  }
}
