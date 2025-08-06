import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register-chefzone',
  templateUrl: './register-chefzone.component.html',
  styleUrls: ['./register-chefzone.component.css']
})
export class RegisterChefzoneComponent implements OnInit {
   form!: FormGroup;
  baseData: any;
  msgerror = '';
  isloading = false;

  // ✅ Liste des zones sans chefZone (chargée depuis le back)
  availableZones: any[] = [];

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router,
    private userService : UserService
  ) {}

  ngOnInit(): void {
    const data = localStorage.getItem('partialRegister');
    if (!data) {
      this.router.navigate(['/register']);
      return;
    }

    this.baseData = JSON.parse(data);

    this.form = this.fb.group({
      zoneId: ['', Validators.required], // ✅ utiliser zoneId
      phoneNumber: ['', Validators.required]
    });

    this.loadAvailableZones(); // 🔁 Charger depuis backend
  }

  // 🔁 Charger les zones qui n'ont pas encore de chefZone
  loadAvailableZones(): void {
    this.userService.getZonesWithoutChef().subscribe({
      next: (zones: any[]) => this.availableZones = zones,
      error: (err: any) => console.error('Erreur lors du chargement des zones:', err)
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    this.isloading = true;

    const fullData = {
      ...this.baseData,
      ...this.form.value // contient zoneId et phoneNumber
    };

    this.authService.register(fullData).subscribe({
      next: () => {
        this.isloading = false;
        localStorage.removeItem('partialRegister');
        this.router.navigate(['/activateaccount'], {
          queryParams: { username: fullData.username }
        });
      },
      error: (err: { message: string }) => {
        this.isloading = false;
        this.msgerror = err?.message || 'Erreur complémentaire chef zone';
      }
    });
  }
}
