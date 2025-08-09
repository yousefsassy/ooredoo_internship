import { Component, OnInit } from '@angular/core';
import { DestinataireReportDTO, UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reports-list',
  templateUrl: './reports-list.component.html',
  styleUrls: ['./reports-list.component.css']
})
export class ReportsListComponent implements OnInit {
    reports: DestinataireReportDTO[] = [];
  loading = false;
  errorMessage = '';

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.loadReports();
  }

  loadReports(): void {
    this.loading = true;
    this.errorMessage = '';
    this.userService.getAllReports().subscribe({
      next: (data) => {
        this.reports = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading reports', err);
        this.errorMessage = 'Failed to load reports. Please try again later.';
        this.loading = false;
      }
    });
  }
   viewReport(report: DestinataireReportDTO): void {
    this.router.navigate(['/report-details', report.idReport]);
  }

  createReport(): void {
    this.router.navigate(['/createreports-admin']);
  }
}
