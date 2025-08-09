import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Field, FieldDTO, ReportCreationRequest, ReportFieldCreation, Shop, User, UserService } from '../user.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

  

@Component({
  selector: 'app-createreprts-admin',
  templateUrl: './createreprts-admin.component.html',
  styleUrls: ['./createreprts-admin.component.css']
})
export class CreatereprtsAdminComponent implements OnInit {
     reportForm!: FormGroup;

  shops: Shop[] = [];
  users: User[] = [];
  fields: Field[] = [];
  selectedFields: Field[] = [];

  customFieldLabel: string = '';
  customFieldType: string = 'text';

  // Le rapport créé, utilisé pour afficher les détails
  createdReport: any = null;

  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit(): void {
    this.reportForm = this.fb.group({
      titre: ['', Validators.required],
      description: [''],
      type: ['', Validators.required],
      shopId: ['', Validators.required],
      destinataireId: ['', Validators.required],
    });

    this.loadShops();
    this.loadUsers();
    this.loadFields();
  }

  loadShops() {
    this.userService.getAllShops().subscribe(data => this.shops = data);
  }

  loadUsers() {
    this.userService.getAllUsers().subscribe(data => this.users = data);
  }

  loadFields() {
    this.userService.getAllFields().subscribe(data => {
      this.fields = data.map(f => ({
        id: f.idField,
        label: f.label,
        type: f.type,
        required: f.required
      }));
    });
  }

  onFieldToggle(field: Field, event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    if (checked) {
      if (!this.selectedFields.includes(field)) {
        this.selectedFields.push(field);
      }
    } else {
      this.selectedFields = this.selectedFields.filter(f => f !== field);
    }
  }

  isFieldSelected(field: Field): boolean {
    return this.selectedFields.includes(field);
  }

  removeField(field: Field) {
    this.selectedFields = this.selectedFields.filter(f => f !== field);
  }

  drop(event: CdkDragDrop<Field[]>) {
    moveItemInArray(this.selectedFields, event.previousIndex, event.currentIndex);
  }

  addCustomField() {
    if (!this.customFieldLabel.trim()) {
      alert('Please enter a label for the custom field.');
      return;
    }

    const newFieldDTO: FieldDTO = {
      label: this.customFieldLabel.trim(),
      type: this.customFieldType.toUpperCase(), // ex: 'TEXT', 'NUMBER', 'DATE'
      required: false,
      options: []
    };

    this.userService.addField(newFieldDTO).subscribe({
      next: (createdField) => {
        const newField: Field = {
          id: createdField.idField,
          label: createdField.label,
          type: createdField.type,
          required: createdField.required
        };
        this.fields.push(newField);
        this.selectedFields.push(newField);
        this.customFieldLabel = '';
        this.customFieldType = 'text';
        alert('Custom field added successfully.');
      },
      error: (err) => {
        console.error('Error adding custom field:', err);
        alert('Failed to add custom field.');
      }
    });
  }

  onSubmit() {
    if (this.reportForm.invalid) {
      alert('The form is invalid, please check required fields.');
      return;
    }

    if (this.selectedFields.length === 0) {
      alert('Please select at least one field.');
      return;
    }

    const selectedFieldIds: number[] = this.selectedFields
      .map(field => field.id)
      .filter((id): id is number => id !== undefined && id !== null);

    const requestBody: ReportCreationRequest = {
      titre: this.reportForm.value.titre,
      description: this.reportForm.value.description,
      type: this.reportForm.value.type,
      destinataireId: Number(this.reportForm.value.destinataireId),
      shopId: Number(this.reportForm.value.shopId),
      fieldIds: selectedFieldIds,
    };

    this.userService.createReport(requestBody).subscribe({
      next: (response) => {
        alert('Report created successfully.');
        this.createdReport = response;  // Sauvegarder pour affichage
        this.reportForm.reset();
        this.selectedFields = [];
      },
      error: (err) => {
        console.error('Error creating report:', err);
        alert('Failed to create report.');
      }
    });
  }

  // Méthode pour récupérer la valeur d'un champ dans le rapport créé
  getFieldValue(fieldId: number): string {
    if (!this.createdReport || !this.createdReport.fieldValues) return 'N/A';
    const found = this.createdReport.fieldValues.find((val: any) => val.fieldId === fieldId);
    return found ? found.value : 'N/A';
  }




}


