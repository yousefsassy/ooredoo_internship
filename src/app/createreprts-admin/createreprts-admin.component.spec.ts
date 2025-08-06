import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatereprtsAdminComponent } from './createreprts-admin.component';

describe('CreatereprtsAdminComponent', () => {
  let component: CreatereprtsAdminComponent;
  let fixture: ComponentFixture<CreatereprtsAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreatereprtsAdminComponent]
    });
    fixture = TestBed.createComponent(CreatereprtsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
