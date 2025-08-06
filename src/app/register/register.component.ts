import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GoogleAuthService } from '../auth/google-auth.service';
import { AuthenticationService } from '../auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerform!: FormGroup;
  isloading = false;
  msgerror = '';
  showPassword = false;
  showRePassword = false;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private googleAuthService: GoogleAuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerform = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[$!%*?&])[A-Za-z\d$!%*?&]{8,20}$/)
      ]],
      rePassword: ['', Validators.required],
      role: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(group: FormGroup): { [key: string]: boolean } | null {
    const password = group.get('password')?.value;
    const rePassword = group.get('rePassword')?.value;
    return password && rePassword && password !== rePassword ? { mismatch: true } : null;
  }

  onSubmit(): void {
  if (this.registerform.invalid) return;

  const selectedRole = this.registerform.get('role')?.value;
  const user = this.registerform.value;

  if (selectedRole === 'ADMINSHOP') {
    localStorage.setItem('partialRegister', JSON.stringify(user));
    this.router.navigate(['/register-adminshop']);
  } else if (selectedRole === 'CHEFZONE') {
    localStorage.setItem('partialRegister', JSON.stringify(user));
    this.router.navigate(['/register-chefzone']);
  
  } else if (selectedRole === 'CHEFSECTEUR') {
    localStorage.setItem('partialRegister', JSON.stringify(user));
    this.router.navigate(['/register-chefsecteur']);
  
  } else if (selectedRole === 'CHEFREGION') {
    localStorage.setItem('partialRegister', JSON.stringify(user));
    this.router.navigate(['/register-chefregion']);
  
  } 
  else if (selectedRole === 'ADMIN') {
    this.isloading = true;
    this.authService.register(user).subscribe({
      next: (res) => {
        this.isloading = false;
        this.router.navigate(['/activateaccount'], {
          queryParams: { username: user.username }
        });
      },
      error: (err) => {
        this.isloading = false;
        this.msgerror = err?.message || 'An error occurred during registration.';
      }
    });
  }
}


  
  

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  toggleRePasswordVisibility(): void {
    this.showRePassword = !this.showRePassword;
  }

  

}
