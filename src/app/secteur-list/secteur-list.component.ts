import { Component, OnInit } from '@angular/core';
import { Secteur, UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-secteur-list',
  templateUrl: './secteur-list.component.html',
  styleUrls: ['./secteur-list.component.css']
})
export class SecteurListComponent implements OnInit {
    secteurs: Secteur[] = [];
  filteredSecteurs: Secteur[] = [];
  searchTerm: string = '';
  loading = false;
  errorMessage = '';
  

  constructor(private userService: UserService , private router: Router) {}

  ngOnInit(): void {
    this.loadSecteurs();
  }

 loadSecteurs(): void {
  this.loading = true;
  this.userService.getAllSecteurs().subscribe({
    next: (data) => {
      // mapping idSecteur => id
      this.secteurs = data.map(s => ({
        ...s,
        id: s.idSecteur
      }));
      this.filteredSecteurs = this.secteurs;
      this.loading = false;
    },
    error: (err) => {
      this.errorMessage = 'Error loading sectors: ' + err.message;
      this.loading = false;
    }
  });
}


  onSearchChange(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredSecteurs = this.secteurs.filter(s => 
      s.nom.toLowerCase().includes(term)
    );
  }

  onAddSecteur() {
    this.router.navigate(['/secteur']);
  }

onViewSecteur(secteur: Secteur) {
 this.router.navigate(['/secteurs', secteur.idSecteur]);

}



  

}
