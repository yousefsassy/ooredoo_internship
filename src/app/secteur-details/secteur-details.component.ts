import { Component, OnInit } from '@angular/core';
import { Secteur, UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-secteur-details',
  templateUrl: './secteur-details.component.html',
  styleUrls: ['./secteur-details.component.css']
})
export class SecteurDetailsComponent implements OnInit {
  secteur?: Secteur;
  loading: boolean = false;        // <--- ajouter cette ligne
  errorMessage: string = ''; 

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.userService.getSecteurById(id).subscribe({
        next: (secteur) => {
          this.secteur = secteur;
          console.log('Secteur reçu :', secteur);
        },
        error: (err) => {
          console.error('Erreur lors de la récupération du secteur :', err);
        }
      });
    } else {
      console.error('ID du secteur non trouvé dans la route.');
    }
  }
   onBack() {
    this.router.navigate(['/secteur-list']);
  }
}
