import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService, User } from '../user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  user: User | null = null;          // <-- declare user!
  isLoading: boolean = true;         // <-- declare isLoading!
  error: string | null = null;       // <-- declare error!

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.userService.getUserById(+id).subscribe({
        next: (data) => {
          this.user = data;
          this.isLoading = false;
        },
        error: (err) => {
          this.error = "Failed to load user details.";
          this.isLoading = false;
        }
      });
    } else {
      this.error = "Invalid user ID.";
      this.isLoading = false;
    }
  }
}
