import { Component, OnInit } from '@angular/core';
import { DashboardZoneDTO, UserService, Zone } from '../user.service';

@Component({
  selector: 'app-dashboard-chefzone',
  templateUrl: './dashboard-chefzone.component.html',
  styleUrls: ['./dashboard-chefzone.component.css']
})
export class DashboardChefzoneComponent implements OnInit {
  zone!: Zone;
  stats!: DashboardZoneDTO;
  errorMessage: string = '';
  loading: boolean = true;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      this.errorMessage = 'Token not found.';
      this.loading = false;
      return;
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const username = payload.sub || payload.Username;
      const role = payload.role;

      if (role === 'CHEFZONE') {
        // 1. Get Zone info
        this.userService.getZoneByChefUsername(username).subscribe({
          next: (zoneData) => {
            this.zone = zoneData;

            // 2. Get Dashboard stats only after zone info is available
            this.userService.getDashboardStatsForChefZone(username).subscribe({
              next: (data) => {
                this.stats = data;
                this.loading = false;
              },
              error: (err) => {
                console.error('Erreur stats :', err);
                this.errorMessage = 'Failed to load zone statistics.';
                this.loading = false;
              }
            });
          },
          error: (err) => {
            console.error('Erreur zone :', err);
            this.errorMessage = 'Failed to load your assigned zone.';
            this.loading = false;
          }
        });
      } else {
        this.errorMessage = 'Access denied. Only CHEFZONE can view this page.';
        this.loading = false;
      }
    } catch (e) {
      console.error('Erreur parsing token :', e);
      this.errorMessage = 'Invalid token';
      this.loading = false;
    }
  }
}
