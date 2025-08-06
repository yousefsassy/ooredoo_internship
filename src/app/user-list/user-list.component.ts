import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
  users: any[] = [];
  errorMessage = '';
  filteredUsers: any[] = [];
  currentPage = 1;
  itemsPerPage = 10;
  searchTerm = '';
  filterStatus = 'all';

  // 🔴 Inject Router here!
  constructor(
    private userService: UserService,
    private router: Router      // <-- ADD THIS!
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchTerm = input.value.toLowerCase();
    this.applyFilters();
  }

  onFilterChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.filterStatus = select.value;
    this.applyFilters();
  }

  applyFilters(): void {
    const status = this.filterStatus.toLowerCase();

    this.filteredUsers = this.users.filter(user => {
      const matchesSearch =
        user.username.toLowerCase().includes(this.searchTerm) ||
        user.email.toLowerCase().includes(this.searchTerm);

      let matchesStatus = true;

      switch (status) {
        case 'locked':
          matchesStatus = user.accountLocked;
          break;
        case 'disabled':
          matchesStatus = !user.enabled;
          break;
        case 'pending':
          matchesStatus = !user.enabled || user.accountLocked;
          break;
        case 'all':
        default:
          matchesStatus = true; // show all
      }

      return matchesSearch && matchesStatus;
    });

    this.currentPage = 1;
  }

  sortBy(property: string): void {
    this.filteredUsers.sort((a, b) => {
      if (a[property] < b[property]) return -1;
      if (a[property] > b[property]) return 1;
      return 0;
    });
  }

  loadUsers() {
    this.userService.getAllUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.errorMessage = '';
        this.applyFilters();
      },
      error: (error) => {
        this.errorMessage = 'Erreur lors du chargement des utilisateurs';
        console.error(error);
      }
    });
  }

  approveUser(userId: number) {
    this.userService.approveUser(userId).subscribe({
      next: () => {
        alert('Utilisateur approuvé !');
        this.loadUsers();  // Reload the list for update
      },
      error: (error) => {
        this.loadUsers();
      }
    });
  }

  // ✅ This now works because Router is injected!
  onViewUser(id: number): void {
    this.router.navigate(['/users', id]);
  }

  nextPage(): void {
    if (this.currentPage * this.itemsPerPage < this.users.length) {
      this.currentPage++;
    }
  }

  previousPage(): void {
  if (this.currentPage > 1) {
    this.currentPage--;
  }
}

  get paginatedUsers(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredUsers.slice(startIndex, startIndex + this.itemsPerPage);
  }
}
