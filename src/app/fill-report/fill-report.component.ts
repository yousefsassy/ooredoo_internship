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
  fieldValues: { [fieldId: number]: string } = {};
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
          // Vérification ID
          const fieldId = field.id ?? field.idReportField;
          if (fieldId == null) {
            console.warn("⚠️ Field sans ID", field);
          }

          // Transformation des options si nécessaire
          if (field.type === 'DROPDOWN' && typeof field.options === 'string') {
            field.options = (field.options as string).split(',').map((opt: string) => opt.trim());
          }

          // Initialiser la valeur si absente
          if (!(fieldId in this.fieldValues)) {
            this.fieldValues[fieldId] = '';
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

  submitReport(): void {
    const payload: ReportFieldValueDTO[] = Object.entries(this.fieldValues)
      .filter(([_, value]) => value && value.trim() !== '')
      .map(([fieldId, value]) => ({
        fieldId: Number(fieldId),
        value: value.trim()
      }));

    if (payload.length === 0) {
      alert('Please fill at least one field before submitting.');
      return;
    }

    console.log("✅ Payload soumis :", payload);
    this.submitInProgress = true;

    this.userService.submitReport(this.reportId, payload).subscribe({
      next: () => {
        alert('Report submitted successfully.');
        this.submitInProgress = false;
      },
      error: (err) => {
        console.error('❌ Submission error:', err);
        alert('Submission failed.');
        this.submitInProgress = false;
      }
    });
  }



}
