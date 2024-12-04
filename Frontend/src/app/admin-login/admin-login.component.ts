import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router) {}

  onSubmit() {
    if (this.username === 'admin' && this.password === 'admin123') {
      alert('Login successful!');
      localStorage.setItem('isAdmin', 'true'); // Store admin status
      this.router.navigate(['/admin']); // Navigate to Admin Dashboard
    } else {
      alert('Invalid credentials!');
    }
  }
}
