import { Component, Input, OnInit } from '@angular/core';
import { UserService, Zone } from '../user.service';

@Component({
  selector: 'app-sector-zone',
  templateUrl: './sector-zone.component.html',
  styleUrls: ['./sector-zone.component.css']
})
export class SectorZoneComponent implements OnInit {
  zones: Zone[] = [];
  filteredZones: Zone[] = [];
  searchTerm: string = '';
  filterGovernorate: string = '';
  governorates: string[] = [];
  errorMessage: string = '';

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

      if (role === 'CHEFSECTEUR') {
        this.userService.getZonesByChefSecteurUsername(username).subscribe({
          next: zones => {
            this.zones = zones;
            this.filteredZones = [...zones];
            this.extractGovernorates();
            if (!zones.length) {
              this.errorMessage = 'No zones found for your sector.';
            } else {
              this.errorMessage = '';
            }
          },
          error: err => {
            console.error('Error loading zones:', err);
            this.errorMessage = 'Error loading your zones.';
          }
        });
      } else {
        this.errorMessage = 'Access denied. Only sector chiefs can view this page.';
      }
    } catch (e) {
      console.error('Token decode error:', e);
      this.errorMessage = 'Invalid token.';
    }
  }

  extractGovernorates() {
    const govSet = new Set(this.zones.map(z => z.gouvernorat));
    this.governorates = Array.from(govSet).sort();
  }

  onSearchChange() {
    this.applyFilters();
  }

  onGovernorateChange() {
    this.applyFilters();
  }

  applyFilters() {
    const term = this.searchTerm.trim().toLowerCase();
    const govFilter = this.filterGovernorate.trim().toLowerCase();

    this.filteredZones = this.zones.filter(z => {
      const matchesTerm =
        !term ||
        z.libelle.toLowerCase().includes(term) ||
        z.gouvernorat.toLowerCase().includes(term) ||
        (z.chefZone?.username?.toLowerCase().includes(term) ?? false);

      const matchesGovernorate =
        !govFilter || z.gouvernorat.toLowerCase() === govFilter;

      return matchesTerm && matchesGovernorate;
    });
  }

  onAddZone() {
    console.log('Add zone clicked');
    // Ajouter navigation ou modal ici
  }

  onViewZone(id: number) {
    console.log('View zone', id);
    // Ajouter navigation ou modal ici
  }

  onEditZone(id: number) {
    console.log('Edit zone', id);
    // Ajouter navigation ou modal ici
  }

  onDeleteZone(id: number) {
    if (confirm('Are you sure you want to delete this zone?')) {
      this.userService.deleteZone(id).subscribe({
        next: () => {
          this.zones = this.zones.filter(z => z.idZone !== id);
          this.applyFilters();
        },
        error: err => {
          console.error(err);
          alert('Failed to delete zone.');
        }
      });
    }
  }
  }