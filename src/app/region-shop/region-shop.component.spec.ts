import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionShopComponent } from './region-shop.component';

describe('RegionShopComponent', () => {
  let component: RegionShopComponent;
  let fixture: ComponentFixture<RegionShopComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegionShopComponent]
    });
    fixture = TestBed.createComponent(RegionShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
