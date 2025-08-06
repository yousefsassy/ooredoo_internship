import { Component, OnInit } from '@angular/core';
import { Secteur, UserService } from '../user.service';

@Component({
  selector: 'app-dashboard-chefsecteur',
  templateUrl: './dashboard-chefsecteur.component.html',
  styleUrls: ['./dashboard-chefsecteur.component.css']
})
export class DashboardChefsecteurComponent implements OnInit {
  secteur: Secteur | null = null;
  errorMessage: string = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      this.errorMessage = 'JWT token missing';
      return;
    }

    let payload: any;
    try {
      payload = JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      this.errorMessage = 'Invalid token format';
      return;
    }

    const username = payload.sub || payload.Username;
    const role = payload.role || payload.roles; // selon ton token

    if (role === 'CHEFSECTEUR') {
      this.userService.getSecteurByChefUsername(username).subscribe({
        next: (data: Secteur) => this.secteur = data,
        error: () => this.errorMessage = 'Failed to load secteur data'
      });
    } else {
      this.errorMessage = 'Unauthorized: You are not a Chef Secteur';
    }
  }
}