import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { AdminService } from './services/admin.service';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { PlantListComponent } from './pages/plant-list/plant-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { PlantDetailsComponent } from './pages/plant-detail/plant-detail.component';
import { RecommendationComponent } from './pages/recommendations/recommendations.component';
import { RecommendationService } from './pages/recommendations/recommendations.service';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { AddPlantComponent } from './pages/add-plant/add-plant.component';
import { EditPlantComponent } from './pages/edit-plant/edit-plant.component';




// Material imports
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { HttpClientModule } from '@angular/common/http';





const routes: Routes = [
  { path: 'plants', component: PlantListComponent },
  { path: '', redirectTo: '/plants', pathMatch: 'full' },
  { path: 'plant/:id', component: PlantDetailsComponent },
  { path: 'admin', component: AdminDashboardComponent },
  { path: 'admin/add-plant', component: AddPlantComponent },
  { path: 'admin/edit-plant/:id', component: EditPlantComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PlantListComponent,
    PlantDetailsComponent,
    RecommendationComponent,
    AdminLoginComponent,
    AddPlantComponent, 
    AdminDashboardComponent,// <-- Make sure AddPlantComponent is listed here
    EditPlantComponent  // <-- Also ensure EditPlantComponent is declared
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    HttpClientModule,
     // Importing the standalone DashboardComponent here
  ],
  providers: [
    RecommendationService,
    AdminService,
    provideHttpClient(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
