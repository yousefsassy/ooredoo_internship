import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { filter } from 'rxjs/operators';

interface NavLink {
  label: string;
  iconClass: string;
  route: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentUsername: string = 'User';
  userRole: string = '';
  navLinks: NavLink[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadUserInfo();

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.loadUserInfo();
      });
  }

  loadUserInfo(): void {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        this.currentUsername = decoded.sub || decoded.Username || 'User';
        this.userRole = (decoded.role || '').toLowerCase();  // Convertit "CHEFZONE" → "chefzone"
        console.log('Décodage du token :', decoded);
        console.log('Rôle détecté :', this.userRole);
      } catch (err) {
        console.error('Erreur lors du décodage du token:', err);
        this.currentUsername = 'User';
        this.userRole = '';
      }
    } else {
      this.currentUsername = 'User';
      this.userRole = '';
    }

    this.setNavLinks();
  }

  setNavLinks() {
  if (this.userRole === 'admin') {
    this.navLinks = [
      { label: 'Dashboard', iconClass: 'fas fa-tachometer-alt', route: '/DashboardAdmin' },
      { label: 'Users', iconClass: 'fas fa-users', route: 'user-list' },
      { label: 'Sectors', iconClass: 'fas fa-users', route: 'secteur-list' },
      { label: 'Zones', iconClass: 'fas fa-map-marked-alt', route: 'zone-list' },
      { label: 'Regions', iconClass: 'fas fa-users', route: 'region-list' },
      { label: 'Shops', iconClass: 'fas fa-store', route: 'shop-list' },
      { label: 'Reports', iconClass: 'fas fa-store', route: 'reports-list' },
      
      

    ];
  } else if (this.userRole === 'adminshop') {
    this.navLinks = [
      { label: 'Dashboard', iconClass: 'fas fa-tachometer-alt', route: '/myShop' },
      { label: 'Reports', iconClass: 'fas fa-store', route: '/received-reports' }

    ];
  } else if (this.userRole === 'chefzone') {
    this.navLinks = [
      { label: 'Dashboard', iconClass: 'fas fa-tachometer-alt', route: '/dashboardChefZone' },
      { label: 'Regions in Zone', iconClass: 'fas fa-store', route: '/regionInZone' },
       { label: 'Reports', iconClass: 'fas fa-store', route: 'received-reports' }

    ];
  } else if (this.userRole === 'chefregion') {
    this.navLinks = [
      { label: 'Dashboard', iconClass: 'fas fa-tachometer-alt', route: '/dashboardRegion' },
      { label: 'Shops in Region', iconClass: 'fas fa-store', route: '/shops-in-region' },
      { label: 'Reports', iconClass: 'fas fa-store', route: 'received-reports' }

    ];
  } else if (this.userRole === 'chefsecteur') {
    this.navLinks = [
      { label: 'Dashboard', iconClass: 'fas fa-tachometer-alt', route: '/dashboardChefSecteur' },
      { label: 'Zones in Sector', iconClass: 'fas fa-map-marked-alt', route: '/sector-zone' },
      { label: 'Reports', iconClass: 'fas fa-store', route: 'received-reports' }

    ];
    } else {
      this.navLinks = [
        { label: 'Dashboard', iconClass: 'fas fa-tachometer-alt', route: '/dashboard' }
      ];
    }
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userClaims');
    this.router.navigate(['/login']);
  }
}
