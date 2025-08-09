import { Component, OnInit } from '@angular/core';
import { Field, ReportDTO, ReportField, ReportFieldDTO, ReportFieldValueDTO, UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../auth/auth.service';

@Component({
  selector: 'app-fill-report',
  templateUrl: './fill-report.component.html',
  styleUrls: ['./fill-report.component.css']
})
export class FillReportComponent implements OnInit{
    reportId!: number;
  report!: ReportDTO;
  fields: ReportFieldDTO[] = [];

  // Pour stocker les valeurs des champs texte/date/dropdown etc.
  fieldValues: { [fieldId: number]: any } = {};

  // Pour stocker les fichiers sélectionnés (photos)
  photoFiles: { [fieldId: number]: File } = {};

  // Pour stocker les previews des photos sélectionnées
  photoPreviews: { [fieldId: number]: string | ArrayBuffer | null } = {};

  loadingReport = true;
  loadingFields = true;
  submitInProgress = false;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.reportId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadReportDetails();
    this.loadReportFields();
  }

  loadReportDetails(): void {
    this.loadingReport = true;
    this.userService.getReportById(this.reportId).subscribe({
      next: (data) => {
        this.report = data;
        this.loadingReport = false;
      },
      error: (err) => {
        console.error('Error loading report:', err);
        this.loadingReport = false;
      }
    });
  }

  loadReportFields(): void {
    this.loadingFields = true;
    this.userService.getReportFields(this.reportId).subscribe({
      next: (fields: ReportFieldDTO[]) => {
        this.fields = fields.map(field => {
          const fieldId = field.id ?? field.idReportField;
          // Initialiser les valeurs par défaut selon type
          if (!(fieldId in this.fieldValues)) {
            switch (field.type) {
              case 'CHECKBOX':
                this.fieldValues[fieldId] = false;
                break;
              default:
                this.fieldValues[fieldId] = '';
            }
          }
          return { ...field, idReportField: fieldId };
        });
        this.loadingFields = false;
      },
      error: (err) => {
        console.error('Error loading fields:', err);
        this.loadingFields = false;
      }
    });
  }

  onFileSelected(event: Event, fieldId: number): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.photoFiles[fieldId] = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.photoPreviews[fieldId] = reader.result;
      };
      reader.readAsDataURL(file);

      // Vider la valeur texte si existante
      this.fieldValues[fieldId] = '';
    }
  }

  submitReport(): void {
    const formData = new FormData();

    // Ajouter champs texte/date/dropdown/checkbox (ignore champs fichiers)
    for (const [fieldIdStr, value] of Object.entries(this.fieldValues)) {
      const fieldId = Number(fieldIdStr);
      const field = this.fields.find(f => f.idReportField === fieldId);
      if (!field) continue;

      if (field.type === 'FILE_UPLOAD') continue;

      // Pour checkbox, envoyer "true" ou "false" en string
      if (field.type === 'CHECKBOX') {
        formData.append(`field_${fieldId}`, value ? 'true' : 'false');
      } else if (value && value.toString().trim() !== '') {
        formData.append(`field_${fieldId}`, value.toString().trim());
      }
    }

    // Ajouter fichiers photo
    for (const [fieldIdStr, file] of Object.entries(this.photoFiles)) {
      if (file) {
        formData.append(`field_${fieldIdStr}`, file);
      }
    }

    // Vérifier qu'au moins un champ est rempli
    let hasData = false;
    formData.forEach(() => {
      hasData = true;
    });

    if (!hasData) {
      alert('Please fill at least one field before submitting.');
      return;
    }

    this.submitInProgress = true;
    const username = this.authService.getUsername();

    this.userService.submitReportWithFormData(this.reportId, username, formData).subscribe({
      next: () => {
        alert('Report submitted successfully.');
        this.submitInProgress = false;
      },
      error: (err) => {
        console.error('Submission error:', err);
        alert('Submission failed.');
        this.submitInProgress = false;
      }
    });
  }




  }




