import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../auth/auth.service';
import { Shop, UserService } from '../user.service';

@Component({
  selector: 'app-register-adminshop',
  templateUrl: './register-adminshop.component.html',
  styleUrls: ['./register-adminshop.component.css']
})
export class RegisterAdminshopComponent implements OnInit {
  form!: FormGroup;
  baseData: any;
  msgerror = '';
  isloading = false;
  shopsWithoutAdmin: Shop[] = [];  // list for dropdown

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private userService: UserService,  // inject UserService
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
      
      address: ['', Validators.required],
      shopId: ['', Validators.required]  // add this control for shop selection
    });

    this.loadShopsWithoutAdmin();
  }

  loadShopsWithoutAdmin(): void {
    this.userService.getShopsWithoutAdmin().subscribe({
      next: (shops: Shop[]) => {
        this.shopsWithoutAdmin = shops;
      },
      error: (err: any) => {
        console.error('Failed to load shops without admin:', err);
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
