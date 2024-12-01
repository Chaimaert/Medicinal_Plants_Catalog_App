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
      image: 'assets/AV.jpg',
      name: 'Aloe Vera', 
    },
    {
      id: 2,
      image: 'assets/plant4.jpg',
      name: 'Mint',
    },
    {
      id: 3,
      image: 'assets/lavendar.jpg',
      name: 'Lavendar', 
    },
    {
      image: 'assets/calendula.jpg',
      name: 'Calendula', 
    },
    {
      image: 'assets/chamomile.jpg',
      name: 'Chamomile', 
    },
    {
      image: 'assets/tumeric.jpg',
      name: 'Tumeric', 
    },
    {
      image: 'assets/roseamry.jpg',
      name: 'Rosemary', 
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
  
  

   // Delete plant
   deletePlant(id: number) {
    this.plants = this.plants.filter(plant => plant.id !== id);
  }

  // Logout
  logout() {
    // Call your backend logout method if needed
    this.router.navigate(['/login']);
  }
}
