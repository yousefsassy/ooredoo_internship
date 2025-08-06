import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterChefzoneComponent } from './register-chefzone.component';

describe('RegisterChefzoneComponent', () => {
  let component: RegisterChefzoneComponent;
  let fixture: ComponentFixture<RegisterChefzoneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterChefzoneComponent]
    });
    fixture = TestBed.createComponent(RegisterChefzoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
