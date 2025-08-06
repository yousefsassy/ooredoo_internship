import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service'; // Make sure path is correct

@Component({
  selector: 'app-zone-details',
  templateUrl: './zone-details.component.html',
  styleUrls: ['./zone-details.component.css']
})
export class ZoneDetailsComponent implements OnInit {
  zone: any = null;
  isLoading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.userService.getZoneById(+id).subscribe({
        next: (data) => {
          this.zone = data;
          this.isLoading = false;
        },
        error: (err) => {
          this.error = "Failed to load zone details.";
          this.isLoading = false;
        }
      });
    } else {
      this.error = "Invalid zone ID.";
      this.isLoading = false;
    }
  }
}
