import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Secteur, UserService } from '../user.service';

@Component({
  selector: 'app-secteur',
  templateUrl: './secteur.component.html',
  styleUrls: ['./secteur.component.css']
})
export class SecteurComponent implements OnInit {
   secteurForm!: FormGroup;
  successMessage = '';
  errorMessage = '';
  loading = false;

  availableSectors: string[] = [
    'Greater Tunis Centre',
    'Greater Tunis North',
    'Greater Tunis South',
    'North-West Interior',
    'North-West Littoral',
    'Central East Coast',
    'Central Interior East',
    'Central West',
    'South-East Coastal',
    'South-East Interior',
    'South-West Desert',
    'South-West Oasis'
  ];

   sectorsDetail: { [key: string]: { name: string; delegations: string[] }[] } = {
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


  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit(): void {
    this.secteurForm = this.fb.group({
      nom: ['', Validators.required]
    });
    this.removeAlreadyCreatedSectors();
  }

  // Call API to prevent recreating sectors that already exist
  removeAlreadyCreatedSectors(): void {
    this.userService.getAllSecteurs().subscribe({
      next: (sectors) => {
        const existingNames = sectors.map(s => s.nom);
        this.availableSectors = this.availableSectors.filter(name => !existingNames.includes(name));
      },
      error: () => {
        this.errorMessage = 'Unable to load existing sectors';
      }
    });
  }

  onSubmit(): void {
  if (this.secteurForm.invalid) return;
  this.loading = true;

  const newSector: Secteur = {
    nom: this.secteurForm.value.nom, // <-- ici
    regions: []
  };

  this.userService.createSecteur(newSector).subscribe({
    next: (res) => {
      this.successMessage = `Sector "${res.nom}" created successfully.`;
      this.errorMessage = '';
      this.loading = false;

      this.availableSectors = this.availableSectors.filter(name => name !== res.nom);
      this.secteurForm.reset();
    },
    error: () => {
      this.errorMessage = 'Error creating sector.';
      this.successMessage = '';
      this.loading = false;
    }
  });
}


}
