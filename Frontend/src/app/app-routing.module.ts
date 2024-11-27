import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SearchPlantsComponent } from './pages/search-plants/search-plants.component';
import { RecommendationComponent } from './pages/recommendations/recommendations.component';
import { PlantDetailsComponent } from './pages/plant-detail/plant-detail.component';
import { PlantListComponent } from './pages/plant-list/plant-list.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { EditPlantComponent } from './pages/edit-plant/edit-plant.component';



const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'search', component: SearchPlantsComponent },
  { path: 'admin-login', component: AdminLoginComponent },
  { path: 'recommendations', component: RecommendationComponent },
  { path: 'plants', component: PlantListComponent },
  { path: 'plant-details/:id', component: PlantDetailsComponent },
  { path: 'login', component: AdminLoginComponent },  // Ensure the login route is defined
  { path: 'admin', component: AdminDashboardComponent },  // Admin dashboard route
  { path: '', redirectTo: '/login', pathMatch: 'full' },  // Default route is login
  { path: 'admin/edit-plant/:id', component: EditPlantComponent },
  

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
