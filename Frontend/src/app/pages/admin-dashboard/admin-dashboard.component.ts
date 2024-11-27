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
  plants: any[] = [
    {
      id: 1,
      image: 'assets/plant1.jpg',
      name: 'Aloe Vera', 
    },
    {
      id: 2,
      image: 'assets/plant4.jpg',
      name: 'Mint',
    },
    {
      id: 3,
      image: 'assets/plant5.jpg',
      name: 'Mint', 
    },
    {
      image: 'assets/plant7.jpg',
      name: 'Mint', 
    },
  ];

  constructor(
    private plantService: PlantManagementService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadPlants();
  }

  loadPlants() {
    this.plantService.getPlants().subscribe(data => {
      this.plants = data;
    });
  }

  // Navigate to add plant form
  addPlant() {
    this.router.navigate(['/admin/add-plant']);
  }

  // Navigate to edit plant form (convert id to string)
  editPlant(id: number) {
    console.log('Edit button clicked, navigating to edit page with ID:', id); // Debug log
    this.router.navigate([`/admin/edit-plant/${id.toString()}`]);
  }
  
  

  // Delete a plant (convert id to string)
  deletePlant(id: number) {
    this.plantService.deletePlant(id.toString()).subscribe(() => { // Convert id to string
      this.loadPlants(); // Reload the plant list after deletion
    });
  }

  // Logout
  logout() {
    // Call your backend logout method if needed
    this.router.navigate(['/login']);
  }
}
