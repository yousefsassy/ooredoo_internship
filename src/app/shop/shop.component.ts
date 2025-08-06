import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Region, Shop, User, UserService, Zone } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit{
   shopForm: FormGroup;
  users: User[] = [];
  regions: Region[] = [];

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.shopForm = this.fb.group({
      nomShop: ['', Validators.required],
      telephone: ['', Validators.required],
      region: [null, Validators.required],     // objet Region
    });
  }

  ngOnInit(): void {
   

    // Charger toutes les régions (pour la liste déroulante)
    this.userService.getAllRegions().subscribe({
      next: (regions) => this.regions = regions,
      error: (err) => console.error('Erreur chargement régions', err)
    });
  }

  onSubmit(): void {
    if (this.shopForm.invalid) {
      this.shopForm.markAllAsTouched();
      return;
    }

    const formValue = this.shopForm.value;

    // Préparation de l'objet Shop avec juste les ids nécessaires
    const newShop: Shop = {
      nomShop: formValue.nomShop,
      telephone: formValue.telephone,
      region: {
        idRegion: formValue.region.idRegion,
        nom: '',
        delegation: ''
      }
    };

    this.userService.createShop(newShop).subscribe({
      next: (shop) => {
        console.log('Shop créé avec succès :', shop);
        alert('Shop créé avec succès !');
        this.shopForm.reset();
      },
      error: (err) => {
        console.error('Erreur création shop :', err);
        alert('Erreur lors de la création du shop.');
      }
    });
  }

}
