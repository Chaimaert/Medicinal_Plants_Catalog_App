// admin-dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { PlantManagementService } from '../../services/plant-management.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  plants: any[] = [];

  constructor(
    private plantService: PlantManagementService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadPlants();
  }

  loadPlants() {
    this.plantService.getPlants().subscribe(
      (data) => {
        this.plants = data.map((plant: any) => {
          return {
            ...plant,
            image: plant.images && plant.images.length > 0 ? plant.images[0] : 'assets/default-image.jpg',
          };
        });
        console.log('Mapped plants with image URLs:', this.plants);
      },
      (error) => {
        console.error('Error fetching plants:', error);
      }
    );
  }

  // add plant form
  addPlant() {
    this.router.navigate(['/admin/add-plant']);
  }

  //edit plant form
  editPlant(id: number) {
    console.log('Edit button clicked, navigating to edit page with ID:', id);
    this.router.navigate([`/admin/edit-plant/${id.toString()}`]);
  }

  deletePlant(id: number) {

    const confirmDelete = window.confirm('Are you sure you want to delete this plant?');


    if (confirmDelete) {
      this.plantService.deletePlant(id.toString()).subscribe(() => {
        this.plants = this.plants.filter(plant => plant.id !== id);
        console.log('Plant deleted successfully!');
      }, error => {
        console.error('Error while deleting the plant', error);
        alert('Failed to delete the plant. Please try again.');
      });
    } else {
      console.log('Deletion cancelled by the admin.');
    }
  }


  // Logout
  logout() {
    this.router.navigate(['/login']);
  }
}
