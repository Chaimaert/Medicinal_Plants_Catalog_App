import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SearchPlantsComponent } from './pages/search-plants/search-plants.component';
import { RecommendationsComponent } from './pages/recommendations/recommendations.component';
import { PlantDetailsComponent } from './pages/plant-detail/plant-detail.component';
import { PlantListComponent } from './pages/plant-list/plant-list.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { EditPlantComponent } from './pages/edit-plant/edit-plant.component';
import { AddPlantComponent } from './pages/add-plant/add-plant.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },  // Redirection vers la page d'accueil
  { path: 'home', component: HomeComponent },
  { path: 'search', component: SearchPlantsComponent },
  { path: 'recommendations', component: RecommendationsComponent },
  { path: 'plants', component: PlantListComponent },
  { path: 'plant-details/:id', component: PlantDetailsComponent },
  { path: 'admin-login', component: AdminLoginComponent }, // Route pour la connexion admin
  { path: 'admin', component: AdminDashboardComponent }, // Dashboard admin
  { path: 'admin/edit-plant/:id', component: EditPlantComponent }, // Édition de plante
  { path: 'admin/add-plant', component: AddPlantComponent }, // Ajout de plante
  { path: 'login', component: AdminLoginComponent }, // Route de connexion (peut être supprimée si redondante)
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }