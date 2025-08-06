import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterChefregionComponent } from './register-chefregion.component';

describe('RegisterChefregionComponent', () => {
  let component: RegisterChefregionComponent;
  let fixture: ComponentFixture<RegisterChefregionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterChefregionComponent]
    });
    fixture = TestBed.createComponent(RegisterChefregionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
