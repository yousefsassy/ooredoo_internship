import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardChefsecteurComponent } from './dashboard-chefsecteur.component';

describe('DashboardChefsecteurComponent', () => {
  let component: DashboardChefsecteurComponent;
  let fixture: ComponentFixture<DashboardChefsecteurComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardChefsecteurComponent]
    });
    fixture = TestBed.createComponent(DashboardChefsecteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
