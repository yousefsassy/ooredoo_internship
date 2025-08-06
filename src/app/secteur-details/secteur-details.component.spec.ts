import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecteurDetailsComponent } from './secteur-details.component';

describe('SecteurDetailsComponent', () => {
  let component: SecteurDetailsComponent;
  let fixture: ComponentFixture<SecteurDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SecteurDetailsComponent]
    });
    fixture = TestBed.createComponent(SecteurDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
