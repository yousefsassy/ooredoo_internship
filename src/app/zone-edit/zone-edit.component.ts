import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService, Zone } from '../user.service';

@Component({
  selector: 'app-zone-edit',
  templateUrl: './zone-edit.component.html',
  styleUrls: ['./zone-edit.component.css']
})
export class ZoneEditComponent implements OnInit {
  zoneForm!: FormGroup;
  zoneId!: number;
  zoneLoaded = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.zoneId = +this.route.snapshot.paramMap.get('id')!;
    this.zoneForm = this.fb.group({
      libelle: ['', Validators.required],
      gouvernorat: ['', Validators.required],
      delegation: ['', Validators.required],
      adresse: ['', Validators.required]
    });

    // Pré-remplir le formulaire
    this.userService.getZoneById(this.zoneId).subscribe({
      next: (zone) => {
        this.zoneForm.patchValue(zone);
        this.zoneLoaded = true;
      },
      error: (err) => {
        console.error('Erreur de chargement de la zone :', err);
        this.zoneLoaded = false;
      }
    });
  }

  onSubmit(): void {
    if (this.zoneForm.valid) {
      const updatedZone: Zone = this.zoneForm.value;
      this.userService.updateZone(this.zoneId, updatedZone).subscribe({
        next: () => {
          alert('Zone mise à jour avec succès !');
          this.router.navigate(['/zones']); // Redirection vers la liste des zones
        },
        error: (err) => {
          console.error('Erreur lors de la mise à jour :', err);
          alert('Une erreur est survenue.');
        }
      });
    }
  }

}
