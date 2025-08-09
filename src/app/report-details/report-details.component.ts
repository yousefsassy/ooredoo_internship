import { Component, OnInit } from '@angular/core';
import { DestinataireReportDTO, ReportDTO, ReportFieldValueDTO, UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-report-details',
  templateUrl: './report-details.component.html',
  styleUrls: ['./report-details.component.css']
})

export class ReportDetailsComponent implements OnInit{
      reportId!: number;
  report?: DestinataireReportDTO;
  loading = false;
  errorMessage = '';

  // Adresse de ton backend (modifier si besoin)
  backendUrl = 'http://localhost:8089';

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('idReport');
    this.reportId = idParam ? Number(idParam) : 0;

    if (!this.reportId || this.reportId <= 0) {
      this.errorMessage = "Identifiant de rapport invalide.";
      return;
    }
    this.loadReportDetails();
  }

  loadReportDetails(): void {
    this.loading = true;
    this.errorMessage = '';

    this.userService.getReportWithValues(this.reportId).subscribe({
      next: (data: DestinataireReportDTO) => {
        console.log('Données rapport reçues:', data);
        this.report = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur lors du chargement du rapport', err);
        this.errorMessage = 'Impossible de charger les détails du rapport.';
        this.loading = false;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/reports-list']);
  }

  // Vérifie si la valeur est une image (base64 ou URL relative /photos)
  isImage(value?: string): boolean {
    if (!value) return false;
    return (
      value.startsWith('data:image') ||
      value.startsWith('/photos/') ||
      /\.(jpeg|jpg|gif|png|bmp|svg)$/i.test(value)
    );
  }

  // Vérifie si la valeur est un booléen texte ("true" / "false")
  isCheckboxValue(value?: string): boolean {
    return value === 'true' || value === 'false';
  }

  getPhotoUrl(photoPath: string): string {
  if (!photoPath) return '';
  if (photoPath.startsWith('http')) return photoPath;
  if (photoPath.startsWith('/')) {
    return 'http://localhost:8089' + photoPath;
  }
  return 'http://localhost:8089/' + photoPath;
}




}
