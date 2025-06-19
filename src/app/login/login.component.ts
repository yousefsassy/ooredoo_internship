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
  id: number;             // <- added
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
  
    const loginData: any = {
      password: password.trim()
    };
  
    if (emailOrUsername?.trim()) {
      const isEmail = emailOrUsername.includes('@');
      if (isEmail) {
        loginData.email = emailOrUsername.trim();
      } else {
        loginData.username = emailOrUsername.trim();
      }
    }
  
    this.authService.login(loginData).subscribe({
      next: (response) => {
        const token = response.token;
        let role = '';
        let userId: number | null = null;
        let userName = ''; // For user name
        
  
        try {
          const decoded = jwtDecode<JwtPayload>(token);
          role = decoded.role;
          userId = decoded.id;            // <- updated
          userName = decoded.name;   // <- updated
        
          // Store user information in localStorage
          localStorage.setItem('userRole', role);
          localStorage.setItem('userId', String(userId));   // store as string
          localStorage.setItem('userName', userName);
          localStorage.setItem('authToken', token);
          
        
          if (role === 'ADMIN') {
            localStorage.setItem('adminToken', token);
          }
        } catch (decodeError) {
          console.error('Error decoding token:', decodeError);
          this.errorMessage = 'Invalid token received from server.';
          this.isLoading = false;
          return;
        }
        
  
  setTimeout(() => {
  switch (role) {
    case 'ADMIN':
      console.log('Navigating to /admin/adminDashboard');
      this.router.navigate(['/test']);
      break;

    case 'USER':
      console.log(`Navigating to /reclamation (CLIENT) with userId: ${userId}`);
      this.router.navigate(['/test']);
      break;


    default:
      console.log('Navigating to / (default)');
      this.router.navigate(['/']);
      break;
  }
  this.isLoading = false;
}, 300);
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
