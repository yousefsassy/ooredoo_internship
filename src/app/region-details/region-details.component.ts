import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService, Region } from '../user.service';

@Component({
  selector: 'app-region-details',
  templateUrl: './region-details.component.html',
  styleUrls: ['./region-details.component.css']
})
export class RegionDetailsComponent implements OnInit {
  region: Region | null = null;
  isLoading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.userService.getRegionById(+id).subscribe({
        next: (data) => {
          this.region = data;
          this.isLoading = false;
          // You can log the data for debugging if needed:
          // console.log("Loaded region:", data);
        },
        error: (err) => {
          this.error = "Failed to load region details.";
          this.isLoading = false;
        }
      });
    } else {
      this.error = "Invalid region ID.";
      this.isLoading = false;
    }
  }
}
