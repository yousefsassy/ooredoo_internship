import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardChefzoneComponent } from './dashboard-chefzone.component';

describe('DashboardChefzoneComponent', () => {
  let component: DashboardChefzoneComponent;
  let fixture: ComponentFixture<DashboardChefzoneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardChefzoneComponent]
    });
    fixture = TestBed.createComponent(DashboardChefzoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
