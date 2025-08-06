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

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.loadReports();
  }

  loadReports(): void {
    this.userService.getAllReports().subscribe({
      next: (data) => {
        this.reports = data;
      },
      error: (err) => console.error('Error loading reports', err)
    });
  }

  viewReport(report: DestinataireReportDTO): void {
    this.router.navigate(['/report-details', report.idReport]);
  }

  createReport(): void {
    this.router.navigate(['/createreports-admin']);
  }}
