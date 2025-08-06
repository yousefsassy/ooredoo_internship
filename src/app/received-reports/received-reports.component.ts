import { Component } from '@angular/core';
import { DestinataireReportDTO, ReportDTO, UserService } from '../user.service';
import { AuthenticationService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-received-reports',
  templateUrl: './received-reports.component.html',
  styleUrls: ['./received-reports.component.css']
})
export class ReceivedReportsComponent {
     reports: DestinataireReportDTO[] = [];
  username: string | null = null;

  constructor(
    private userService: UserService,
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.username = this.authService.getUsername();
    if (this.username) {
      this.loadReports();
    } else {
      console.error('Utilisateur non connecté');
    }
  }

  loadReports(): void {
    if (!this.username) {
      console.error('Username introuvable');
      return;
    }

    this.userService.getReportsForDestinataire(this.username).subscribe({
      next: (data: DestinataireReportDTO[]) => {
        this.reports = data;
        console.log('Rapports chargés:', this.reports);
      },
      error: (err: any) => console.error('Erreur chargement rapports', err)
    });
  }

  onFillReport(reportId: number | undefined): void {
  console.log("ID du rapport reçu :", reportId);
  if (!reportId) {
    console.error("ID du rapport invalide :", reportId);
    return;
  }
  this.router.navigate(['/fill-report', reportId]);
}


}


