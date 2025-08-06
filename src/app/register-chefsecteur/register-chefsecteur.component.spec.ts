import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterChefsecteurComponent } from './register-chefsecteur.component';

describe('RegisterChefsecteurComponent', () => {
  let component: RegisterChefsecteurComponent;
  let fixture: ComponentFixture<RegisterChefsecteurComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterChefsecteurComponent]
    });
    fixture = TestBed.createComponent(RegisterChefsecteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
