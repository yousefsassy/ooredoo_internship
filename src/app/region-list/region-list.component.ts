import { Component, OnInit } from '@angular/core';
import { Region, UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-region-list',
  templateUrl: './region-list.component.html',
  styleUrls: ['./region-list.component.css']
})
export class RegionListComponent implements OnInit{
regions: Region[] = [];
  filteredRegions: Region[] = [];
  searchTerm: string = '';
  loading: boolean = false;
  errorMessage: string = '';

  constructor(private userService: UserService , private router: Router) {}

  ngOnInit(): void {
    this.loadRegions();
  }

  loadRegions(): void {
  this.loading = true;
  this.errorMessage = '';

  this.userService.getAllRegions().subscribe({
    next: (regions: Region[]) => {
      console.log('Data reçue de getAllRegions:', regions);

      // Supprime récursivement la propriété 'regions' pour casser les références circulaires
      const cleanRegions = (regs: Region[]) => {
        regs.forEach(region => {
          if (region.zone?.secteur?.zones) {
            delete region.zone.secteur.zones; // ✅ on supprime zones pour éviter boucle circulaire
          }
        });
      };

      cleanRegions(regions);

      this.regions = regions;
      this.filteredRegions = [...regions];
      this.loading = false;
    },
    error: (err) => {
      this.errorMessage = 'Erreur lors du chargement des régions: ' + err.message;
      this.loading = false;
    }
  });

  }

  onSearchChange(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredRegions = this.regions.filter(r =>
      r.nom.toLowerCase().includes(term) ||
      r.delegation.toLowerCase().includes(term) ||
      r.zone?.libelle.toLowerCase().includes(term)
    );
  }

  onViewRegion(id: number): void {
  this.router.navigate(['/regions', id]);
}

  onAddRegion(): void {
    this.router.navigate(['/region']);
  }
}
