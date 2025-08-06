import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Secteur, UserService, Zone } from '../user.service';

@Component({
  selector: 'app-zone',
  templateUrl: './zone.component.html',
  styleUrls: ['./zone.component.css']
})
export class ZoneComponent implements OnInit {
  zoneForm!: FormGroup;

  secteurs: Secteur[] = [];
  secteursDetail: { [key: string]: { name: string; delegations: string[] }[] } = {
     'Greater Tunis Centre': [
    {
      name: 'Tunis',
      delegations: ['Tunis Ville', 'Bab Souika', 'Cité El Khadhra', 'Djebel Jelloud', 'El Menzah', 'El Omrane', 'El Omrane Supérieur', 'La Goulette', 'La Marsa', 'Le Bardo', 'Médina', 'Sidi El Béchir', 'Sidi Bou Saïd', 'Sidi Hassine', 'Sijoumi']
    },
    {
      name: 'Manouba',
      delegations: ['Borj El Amri', 'Douar Hicher', 'El Battan', 'Djedeida', 'Manouba', 'Mornaguia', 'Oued Ellil', 'Tébourba']
    },
    {
      name: 'Ariana',
      delegations: ['Ariana Ville', 'Ettadhamen', 'Kalaat El Andalous', 'La Soukra', 'Raoued']
    }
  ],
  'Greater Tunis North': [
    {
      name: 'La Marsa, Gammarth, El Menzah',
      delegations: ['(parts of Tunis but often distinguished)']
    },
    {
      name: 'Ben Arous',
      delegations: ['Ben Arous', 'Bou Mhel El Bassatine', 'Ezzahra', 'Fouchana', 'Hammam Chott', 'Hammam Lif', 'Mohamedia', 'Mégrine', 'Mornag', 'Radès']
    }
  ],
  'Greater Tunis South': [
    {
      name: 'South and East Suburbs',
      delegations: ['Ezzahra', 'Mnihla', 'Kalaat El Andalous']
    },
    {
      name: 'Ben Arous parts',
      delegations: ['Bou Mhel El Bassatine', 'Fouchana']
    }
  ],
  'North-West Interior': [
    {
      name: 'Béja',
      delegations: ['Béja Nord', 'Béja Sud', 'Amdoun', 'Goubellat', 'Medjez El Bab', 'Nefza', 'Téboursouk', 'Testour']
    },
    {
      name: 'Jendouba',
      delegations: ['Jendouba', 'Balta-Bou Aouane', 'Ain Draham', 'Bou Salem', 'Fernana', 'Ghardimaou', 'Oued Meliz', 'Tabarka']
    },
    {
      name: 'Siliana',
      delegations: ['Siliana Nord', 'Siliana Sud', 'Bargou', 'Bou Arada', 'El Aroussa', 'El Krib', 'Gaâfour', 'Kesra', 'Makthar', 'Rouhia', 'Sidi Bou Rouis']
    }
  ],
  'North-West Littoral': [
    {
      name: 'Bizerte',
      delegations: ['Bizerte Nord', 'Bizerte Sud', 'Ghar El Melh', 'Mateur', 'Menzel Bourguiba', 'Menzel Jemil', 'Ras Jebel', 'Sejenane', 'Tinja', 'Utique']
    }
  ],
  'Central East Coast': [
    {
      name: 'Nabeul',
      delegations: ['Nabeul', 'Béni Khiar', 'Bou Argoub', 'Dar Chaâbane El Fehri', 'El Haouaria', 'Grombalia', 'Hammamet', 'Kelibia', 'Korba', 'Menzel Bouzelfa', 'Menzel Temime', 'Soliman', 'Takelsa']
    },
    {
      name: 'Zaghouan',
      delegations: ['Zaghouan', 'Bir Mcherga', 'El Fahs', 'Nadhour', 'Saouaf', 'Zriba']
    },
    {
      name: 'Kairouan',
      delegations: ['Kairouan Nord', 'Kairouan Sud', 'Bouhajla', 'Chebika', 'Echrarda', 'Haffouz', 'Hajeb El Ayoun', 'Nasrallah', 'Oueslatia', 'Sbikha']
    },
    {
      name: 'Sousse',
      delegations: ['Sousse Médina', 'Sousse Riadh', 'Sousse Jawhara', 'Sousse Sidi Abdelhamid', 'Akouda', 'Bouficha', 'Enfidha', 'Hammam Sousse', 'Kondar', 'M\'saken', 'Sidi Bou Ali', 'Sidi El Heni', 'Hergla']
    }
  ],
  'Central Interior East': [
    {
      name: 'Sidi Bouzid',
      delegations: ['Sidi Bouzid Est', 'Sidi Bouzid Ouest', 'Bir El Hafey', 'Cebbala Ouled Asker', 'Jilma', 'Meknassy', 'Menzel Bouzaiane', 'Ouled Haffouz', 'Regueb', 'Souk Jedid']
    }
  ],
  'Central West': [
    {
      name: 'Kasserine',
      delegations: ['Kasserine Nord', 'Kasserine Sud', 'Ezzouhour', 'Fériana', 'Foussana', 'Hassi El Ferid', 'Hidra', 'Jedelienne', 'Majel Bel Abbès', 'Sbiba', 'Sbeitla', 'Thala']
    },
    {
      name: 'Le Kef',
      delegations: ['Le Kef Est', 'Le Kef Ouest', 'Dahmani', 'El Ksour', 'Kalâat Khasba', 'Kalâat Senan', 'Nebeur', 'Sakiet Sidi Youssef', 'Tajerouine']
    }
  ],
  'South-East Coastal': [
    {
      name: 'Gabès',
      delegations: ['Gabès Médina', 'Gabès Ouest', 'Gabès Sud', 'El Hamma', 'Ghannouch', 'Mareth', 'Matmata', 'Métouia', 'Menzel El Habib', 'Nouvelle Matmata']
    },
    {
      name: 'Médenine',
      delegations: ['Medenine Nord', 'Medenine Sud', 'Ben Gardane', 'Beni Khedache', 'Djerba Ajim', 'Djerba Houmt Souk', 'Djerba Midoun']
    }
  ],
  'South-East Interior': [
    {
      name: 'Tataouine',
      delegations: ['Tataouine Nord', 'Tataouine Sud', 'Bir Lahmar', 'Dehiba', 'Ghomrassen', 'Remada', 'Smar']
    },
    {
      name: 'Zarzis',
      delegations: ['Zarzis'] 
    }
  ],
  'South-West Desert': [
    {
      name: 'Gafsa',
      delegations: ['Gafsa Nord', 'Gafsa Sud', 'El Guettar', 'El Ksar', 'Mdhilla', 'Métlaoui', 'Moulares', 'Redeyef', 'Sened']
    },
    {
      name: 'Kébili',
      delegations: ['Kébili Nord', 'Kébili Sud', 'Douz Nord', 'Douz Sud', 'Souk Lahad']
    }
  ],
  'South-West Oasis': [
    {
      name: 'Tozeur',
      delegations: ['Tozeur', 'Degache', 'Nefta', 'Tamaghza']
    }
  ]
};

  gouvernorats: string[] = [];
  delegations: string[] = [];

  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit(): void {
    this.zoneForm = this.fb.group({
      secteur: [null, Validators.required],
      gouvernorat: ['', Validators.required],
      
      libelle: [{ value: '', disabled: true }, Validators.required],
    });

    // Charge la liste des secteurs
    this.loadSecteurs();

    // Quand secteur change
    this.zoneForm.get('secteur')?.valueChanges.subscribe(secteur => {
      if (secteur) {
        this.gouvernorats = [];
        this.zoneForm.patchValue({ gouvernorat: '', delegation: '' });
        // Extraire gouvernorats du secteur
        if (this.secteursDetail[secteur.nom]) {
          this.gouvernorats = this.secteursDetail[secteur.nom].map(g => g.name);
        }
      } else {
        this.gouvernorats = [];
        
      }
      this.updateLibelle();
    });

    // Quand gouvernorat change
    this.zoneForm.get('gouvernorat')?.valueChanges.subscribe(gouv => {
      const secteur = this.zoneForm.get('secteur')?.value;
      if (secteur && gouv && this.secteursDetail[secteur.nom]) {
        const govObj = this.secteursDetail[secteur.nom].find(g => g.name === gouv);
        this.delegations = govObj ? govObj.delegations : [];
      } else {
        this.delegations = [];
      }
      this.zoneForm.patchValue({ delegation: '' });
      this.updateLibelle();
    });
  }

  loadSecteurs(): void {
    this.userService.getAllSecteurs().subscribe({
      next: (secteurs) => {
        this.secteurs = secteurs;
      },
      error: () => {
        alert('Erreur chargement des secteurs');
      }
    });
  }

  updateLibelle(): void {
    const secteur = this.zoneForm.get('secteur')?.value;
    const gouvernorat = this.zoneForm.get('gouvernorat')?.value;
    if (secteur && gouvernorat) {
      this.zoneForm.get('libelle')?.setValue(`${secteur.nom} - ${gouvernorat}`);
    } else {
      this.zoneForm.get('libelle')?.setValue('');
    }
  }

  onSubmit(): void {
    if (this.zoneForm.invalid) {
      this.zoneForm.markAllAsTouched();
      return;
    }

    const formValue = this.zoneForm.getRawValue();
    const zone: Zone = {
      libelle: formValue.libelle,
      gouvernorat: formValue.gouvernorat,
      secteur: formValue.secteur,
    };

    this.userService.createZone(zone).subscribe({
      next: () => {
        alert('Zone créée avec succès');
        this.zoneForm.reset();
        this.gouvernorats = [];
        this.delegations = [];
      },
      error: err => {
        console.error(err);
        alert('Erreur lors de la création');
      }
    });
  }

}
