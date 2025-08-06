import { Component, OnInit } from '@angular/core';
import { Region, UserService, Zone } from '../user.service';

@Component({
  selector: 'app-zone-region',
  templateUrl: './zone-region.component.html',
  styleUrls: ['./zone-region.component.css']
})
export class ZoneRegionComponent implements OnInit {
     zone?: Zone;
  errorMessage: string = '';

  searchTerm: string = '';
  filteredRegions: Region[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      this.errorMessage = 'Token not found.';
      return;
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const username = payload.sub || payload.Username;
      const role = payload.role;

      if (role === 'CHEFZONE') {
        this.userService.getZoneByChefUsername(username).subscribe({
          next: zoneData => {
            this.zone = zoneData;
            this.filteredRegions = this.zone?.regions ? [...this.zone.regions] : [];
          },
          error: err => {
            console.error('Error fetching zone:', err);
            this.errorMessage = 'Error loading your zone data.';
          }
        });
      } else {
        this.errorMessage = 'Access denied. Only zone chiefs can view this page.';
      }
    } catch (e) {
      console.error('Token decode error:', e);
      this.errorMessage = 'Invalid token.';
    }
  }

  onSearchChange() {
    if (!this.zone || !this.zone.regions) {
      this.filteredRegions = [];
      return;
    }
    const term = this.searchTerm.toLowerCase();
    this.filteredRegions = this.zone.regions.filter(region =>
      region.nom.toLowerCase().includes(term) ||
      region.delegation.toLowerCase().includes(term) ||
      (region.chefRegion?.username?.toLowerCase().includes(term))
    );
  }

  onAddRegion() {
    // À implémenter : ouvrir formulaire modal ou redirection vers page création région
    console.log('Add region clicked');
  }

  onViewRegion(id: number) {
    // À implémenter : afficher détails région
    console.log('View region', id);
  }

  onEditRegion(id: number) {
    // À implémenter : modifier région
    console.log('Edit region', id);
  }

  onDeleteRegion(id: number) {
    // À implémenter : supprimer région (avec confirmation)
    console.log('Delete region', id);
  }


}
