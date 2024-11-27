import { Component } from '@angular/core';
import { Router } from '@angular/router';  // Import Router
import { ActivatedRoute } from '@angular/router';  // Import ActivatedRoute if needed


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  searchLetter: string = '';

  constructor(private router: Router) {}

  // Search function that triggers navigation with query parameters
  
}