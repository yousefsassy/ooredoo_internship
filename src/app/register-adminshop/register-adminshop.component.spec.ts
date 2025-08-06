import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterAdminshopComponent } from './register-adminshop.component';

describe('RegisterAdminshopComponent', () => {
  let component: RegisterAdminshopComponent;
  let fixture: ComponentFixture<RegisterAdminshopComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterAdminshopComponent]
    });
    fixture = TestBed.createComponent(RegisterAdminshopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
