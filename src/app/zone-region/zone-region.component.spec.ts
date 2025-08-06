import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoneRegionComponent } from './zone-region.component';

describe('ZoneRegionComponent', () => {
  let component: ZoneRegionComponent;
  let fixture: ComponentFixture<ZoneRegionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ZoneRegionComponent]
    });
    fixture = TestBed.createComponent(ZoneRegionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
