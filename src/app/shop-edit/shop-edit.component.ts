import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService, Shop } from '../user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-shop-edit',
  templateUrl: './shop-edit.component.html',
  styleUrls: ['./shop-edit.component.css']
})
export class ShopEditComponent implements OnInit {
  editForm!: FormGroup;
  shopId!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.shopId = Number(this.route.snapshot.paramMap.get('id'));
    this.editForm = this.fb.group({
      nomShop: ['', Validators.required],
      telephone: ['', Validators.required],
      // add other fields and validations
    });

    this.userService.getShopById(this.shopId).subscribe({
      next: (shop) => this.editForm.patchValue(shop),
      error: (err) => console.error('Error fetching shop', err)
    });
  }

  onSubmit(): void {
  if (this.editForm.invalid) return;

  const updatedShop = { ...this.editForm.value, idShop: this.shopId };
  this.userService.updateShop(this.shopId, updatedShop).subscribe({
    next: () => {
      alert('Shop updated successfully!');
      this.router.navigate(['/shops']);
    },
    error: (err) => console.error('Error updating shop', err)
  });
}
}
