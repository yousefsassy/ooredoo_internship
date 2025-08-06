import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Field, ReportDTO, ReportFieldValueDTO, Shop, UserService } from '../user.service';
import { AuthenticationService } from '../auth/auth.service';

@Component({
  selector: 'app-report-create',
  templateUrl: './report-create.component.html',
  styleUrls: ['./report-create.component.css']
})
export class ReportCreateComponent implements OnInit {
   reportForm!: FormGroup;
  shop: Shop | null = null;
  username!: string;
  fields: Field[] = [];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {
    this.username = this.authService.getUsername();

    // 1. Récupérer le shop de l’admin connecté
    this.userService.getShopByAdminUsername(this.username).subscribe(shop => {
      this.shop = shop;
    });

    // 2. Charger les champs dynamiques (statique ou via backend)
    this.loadFields();

    // 3. Initialiser le formulaire
    this.initForm();
  }

  loadFields() {
    this.fields = [
      { id: 1, label: 'Commentaire', type: 'TEXTAREA', required: true },
      { id: 2, label: 'Statut', type: 'DROPDOWN', required: true, options: ['Ouvert', 'Clos'] },
      { id: 3, label: 'Remarque', type: 'TEXT', required: false },
    ];
  }

  initForm() {
    this.reportForm = this.fb.group({
      titre: ['', Validators.required],
      type: ['', Validators.required],
      contenu: ['', Validators.required],
      fieldValues: this.fb.array([]),
    });

    this.fields.forEach(field => {
      const validators = field.required ? [Validators.required] : [];
      const control = this.fb.group({
        value: ['', validators]
      });
      this.fieldValues.push(control);
    });
  }

  get fieldValues(): FormArray {
    return this.reportForm.get('fieldValues') as FormArray;
  }

  isFieldInvalid(index: number): boolean {
    const control = this.fieldValues.at(index).get('value');
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  onSubmit() {
    if (this.reportForm.invalid || !this.shop) return;

   /* const fieldValuesDto: ReportFieldValueDTO[] = this.fieldValues.controls.map((ctrl, index) => ({
      fieldId: this.fields[index].id,
      value: ctrl.get('value')?.value
    }));

    const dto: ReportDTO = {
      titre: this.reportForm.value.titre,
      type: this.reportForm.value.type,
      contenu: this.reportForm.value.contenu,
      shopId: this.shop.idShop!,
      fieldValues: fieldValuesDto
    };*/

   
  }
}
