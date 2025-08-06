import { Component, OnInit } from '@angular/core';
import { Region, UserService, Zone } from '../user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.css']
})
export class RegionComponent implements OnInit{
 regionForm!: FormGroup;
  zones: Zone[] = [];
  delegations: string[] = [];

  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit(): void {
    this.regionForm = this.fb.group({
      zone: [null, Validators.required],
      delegation: ['', Validators.required],
      nom: [{ value: '', disabled: true }, Validators.required]
    });

    this.loadZones();

    // Quand la zone change, mettre à jour la liste des délégations correspondantes
    this.regionForm.get('zone')?.valueChanges.subscribe((selectedZone: Zone) => {
      if (selectedZone) {
        this.updateDelegations(selectedZone.gouvernorat);
      } else {
        this.delegations = [];
      }
      this.updateNom();
    });

    // Quand la délégation change, mettre à jour le champ nom
    this.regionForm.get('delegation')?.valueChanges.subscribe(() => {
      this.updateNom();
    });
  }

  loadZones(): void {
    this.userService.getAllZones().subscribe({
      next: (zones: Zone[]) => {
        this.zones = zones;
      },
      error: () => {
        alert('Erreur lors du chargement des zones');
      }
    });
  }

  updateDelegations(gouvernoratName: string): void {
    // Parcours tous les secteurs pour trouver le gouvernorat
    for (const secteur in this.gouvernoratsDelegations) {
      const found = this.gouvernoratsDelegations[secteur].find(g => g.name === gouvernoratName);
      if (found) {
        this.delegations = found.delegations;
        this.regionForm.patchValue({ delegation: '' });
        return;
      }
    }
    // Si pas trouvé, vider les délégations
    this.delegations = [];
  }

  updateNom(): void {
    const zone: Zone = this.regionForm.get('zone')?.value;
    const delegation: string = this.regionForm.get('delegation')?.value;

    if (zone && delegation) {
      this.regionForm.get('nom')?.setValue(`${zone.libelle} - ${delegation}`);
    } else {
      this.regionForm.get('nom')?.setValue('');
    }
  }

  onSubmit(): void {
    if (this.regionForm.invalid) {
      this.regionForm.markAllAsTouched();
      return;
    }

    const formValue = this.regionForm.getRawValue();

    const region: Region = {
      delegation: formValue.delegation,
      nom: formValue.nom,
      zone: formValue.zone
    };

    this.userService.createRegion(region).subscribe({
      next: () => {
        alert('Région créée avec succès');
        this.regionForm.reset();
        this.delegations = [];
      },
      error: () => {
        alert('Erreur lors de la création de la région');
      }
    });
  }

  gouvernoratsDelegations: { [secteur: string]: { name: string; delegations: string[] }[] } = {
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
        delegations: [] // Zarzis town, pas de délégations détaillées
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
}