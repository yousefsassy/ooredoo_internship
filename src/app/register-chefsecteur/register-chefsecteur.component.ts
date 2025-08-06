import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../auth/auth.service';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-chefsecteur',
  templateUrl: './register-chefsecteur.component.html',
  styleUrls: ['./register-chefsecteur.component.css']
})
export class RegisterChefsecteurComponent implements OnInit{

form!: FormGroup;
  baseData: any;
  msgerror = '';
  isloading = false;
  secteursWithoutChef: any[] = [];

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private registerService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const data = localStorage.getItem('partialRegister');
    if (!data) {
      this.router.navigate(['/register']);
      return;
    }

    this.baseData = JSON.parse(data);

    this.form = this.fb.group({
      secteurId: ['', Validators.required]
    });

    this.loadSecteursWithoutChef();
  }

  loadSecteursWithoutChef(): void {
    this.registerService.getSecteursDisponibles().subscribe({
      next: (secteurs: any[]) => {
        this.secteursWithoutChef = secteurs;
      },
      error: (err: any) => {
        console.error('Erreur lors du chargement des secteurs :', err);
      }
    });
  }

   onSubmit(): void {
    if (this.form.invalid) return;

    this.isloading = true;

    const fullData = {
      ...this.baseData,
      ...this.form.value
    };

    this.authService.register(fullData).subscribe({
      next: () => {
        this.isloading = false;
        localStorage.removeItem('partialRegister');
        this.router.navigate(['/activateaccount'], {
          queryParams: { username: fullData.username }
        });
      },
      error: (err: { message: string; }) => {
        this.isloading = false;
        this.msgerror = err?.message || 'Admin shop completion error';
      }
    });
  }
}
