import { Component, OnInit } from '@angular/core';
import { UserService, Zone } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-zone-list',
  templateUrl: './zone-list.component.html',
  styleUrls: ['./zone-list.component.css']
})
export class ZoneListComponent implements OnInit {

zones: Zone[] = [];
  filteredZones: Zone[] = [];

  // Pour la recherche / filtres
  searchTerm: string = '';
  filterGovernorate: string = '';

  governorates: string[] = [];

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.loadZones();
  }

  loadZones(): void {
    this.userService.getAllZones().subscribe(
      (data: Zone[]) => {
        this.zones = data;
        this.extractGovernorates();
        this.applyFilters();
      },
      error => console.error('Erreur de chargement des zones:', error)
    );
  }

  extractGovernorates(): void {
    // Récupère la liste unique des gouvernorats pour le filtre
    const allGovs = this.zones.map(z => z.gouvernorat);
    this.governorates = Array.from(new Set(allGovs)).sort();
  }

  applyFilters(): void {
    this.filteredZones = this.zones.filter(zone => {
      const matchesSearch = zone.libelle.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesGov = this.filterGovernorate ? zone.gouvernorat === this.filterGovernorate : true;
      return matchesSearch && matchesGov;
    });
  }

  onSearchChange(): void {
    this.applyFilters();
  }

  onGovernorateChange(): void {
    this.applyFilters();
  }

  onAddZone(): void {
    this.router.navigate(['/zone']);
  }

  onEditZone(id: number): void {
    this.router.navigate([`/zones/edit`, id]);

  }

  onViewZone(id: number): void {
  this.router.navigate(['/zones', id]); // or '/zones', id
}

  onArchiveZone(id: number): void {
    if (confirm('Are you sure you want to archive this zone?')) {
      this.userService.deleteZone(id).subscribe({
        next: () => {
          alert('Zone archived successfully!');
          this.loadZones();
        },
        error: err => console.error('Error archiving zone', err)
      });
    }
  }
}
