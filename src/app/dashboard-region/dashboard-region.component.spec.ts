import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardRegionComponent } from './dashboard-region.component';

describe('DashboardRegionComponent', () => {
  let component: DashboardRegionComponent;
  let fixture: ComponentFixture<DashboardRegionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardRegionComponent]
    });
    fixture = TestBed.createComponent(DashboardRegionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
