import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../auth/auth.service';
import { jwtDecode } from 'jwt-decode';

interface LoginFormControls {
  [key: string]: AbstractControl;
  emailOrUsername: AbstractControl;
  password: AbstractControl;
}

interface JwtPayload {
  sub: string;
  role: string;
  exp: number;
  iat: number;
  id: number;
  name: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  errorMessage = '';
  isLoading = false;
  showPassword = false;
  loginForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthenticationService
  ) {
    this.loginForm = this.fb.group({
      emailOrUsername: ['', Validators.required],
      password: ['', [
        Validators.required,
        Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/)
      ]]
    });
  }

  get f(): LoginFormControls {
    return {
      emailOrUsername: this.loginForm.get('emailOrUsername') as AbstractControl,
      password: this.loginForm.get('password') as AbstractControl
    };
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  handleLogin(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const { emailOrUsername, password } = this.loginForm.value;

    const loginData: any = { password: password.trim() };

    if (emailOrUsername?.trim()) {
      const isEmail = emailOrUsername.includes('@');
      if (isEmail) {
        loginData.email = emailOrUsername.trim();
      } else {
        loginData.username = emailOrUsername.trim();
      }
    }

    this.authService.login(loginData).subscribe({
      next: (response: any) => {  // Tu peux typer cette réponse selon ton API
        const token = response.token;

        try {
          const decoded = jwtDecode<JwtPayload>(token);

          // Récupération des infos du token
          const role = decoded.role;
          const userId = decoded.id;
          const userName = decoded.name;

          // Stockage dans localStorage avec la même clé 'authToken'
          localStorage.setItem('authToken', token);
          localStorage.setItem('userRole', role);
          localStorage.setItem('userId', String(userId));
          localStorage.setItem('userName', userName);

          if (role === 'ADMIN') {
            localStorage.setItem('adminToken', token);
          }

          // Navigation selon le rôle (tu peux adapter les routes)
          setTimeout(() => {
            switch (role) {
              case 'ADMIN':
                this.router.navigate(['/DashboardAdmin']);
                break;
              case 'ADMINSHOP':
                this.router.navigate(['/test']);
                break;
              case 'CHEFZONE':
                this.router.navigate(['/dashboardChefZone']);
                break;
                case 'CHEFSECTEUR':
                this.router.navigate(['/dashboardChefSecteur']);
                break;
                case 'CHEFREGION':
                this.router.navigate(['/dashboardRegion']);
                break;
              default:
                this.router.navigate(['/']);
                break;
            }
            this.isLoading = false;
          }, 300);

        } catch (decodeError) {
          console.error('Error decoding token:', decodeError);
          this.errorMessage = 'Invalid token received from server.';
          this.isLoading = false;
        }
      },
      error: (err: any) => {
        this.isLoading = false;
        this.handleError(err);
      }
    });
  }

  private handleError(err: any): void {
    this.errorMessage = err.message || 'Login failed. Please try again.';

    if (err.status === 403) {
      this.errorMessage = 'Account not activated. Please check your email.';
    } else if (err.status === 401) {
      this.errorMessage = 'Invalid credentials. Please check your email/username and password.';
    } else if (err.status === 0) {
      this.errorMessage = 'Network error. Please check your internet connection.';
    }
  }
}
