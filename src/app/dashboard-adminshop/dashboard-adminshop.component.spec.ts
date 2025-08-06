import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardAdminshopComponent } from './dashboard-adminshop.component';

describe('DashboardAdminshopComponent', () => {
  let component: DashboardAdminshopComponent;
  let fixture: ComponentFixture<DashboardAdminshopComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardAdminshopComponent]
    });
    fixture = TestBed.createComponent(DashboardAdminshopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
