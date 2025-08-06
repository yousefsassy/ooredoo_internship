import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register-chefregion',
  templateUrl: './register-chefregion.component.html',
  styleUrls: ['./register-chefregion.component.css']
})
export class RegisterChefregionComponent  implements OnInit {
  form!: FormGroup;
  baseData: any;
  errorMsg = '';
  isLoading = false;

  // List of regions without a chefRegion (loaded from backend)
  availableRegions: any[] = [];

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const data = localStorage.getItem('partialRegister');
    if (!data) {
      this.router.navigate(['/register']);
      return;
    }

    this.baseData = JSON.parse(data);

    this.form = this.fb.group({
      regionId: ['', Validators.required],
      phoneNumber: ['', Validators.required]
    });

    this.loadAvailableRegions();
  }

  loadAvailableRegions(): void {
    this.userService.getRegionsWithoutChef().subscribe({
      next: (regions: any[]) => this.availableRegions = regions,
      error: (err: any) => console.error('Error loading regions:', err)
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    this.isLoading = true;

    const fullData = {
      ...this.baseData,
      ...this.form.value // contains regionId and phoneNumber
    };

    this.authService.register(fullData).subscribe({
      next: () => {
        this.isLoading = false;
        localStorage.removeItem('partialRegister');
        this.router.navigate(['/activateaccount'], {
          queryParams: { username: fullData.username }
        });
      },
      error: (err: { message: string }) => {
        this.isLoading = false;
        this.errorMsg = err?.message || 'Error completing chef region registration';
      }
    });
  }
}

