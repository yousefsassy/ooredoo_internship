import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectorZoneComponent } from './sector-zone.component';

describe('SectorZoneComponent', () => {
  let component: SectorZoneComponent;
  let fixture: ComponentFixture<SectorZoneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SectorZoneComponent]
    });
    fixture = TestBed.createComponent(SectorZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
