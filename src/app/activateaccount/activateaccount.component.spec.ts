import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivateaccountComponent } from './activateaccount.component';

describe('ActivateaccountComponent', () => {
  let component: ActivateaccountComponent;
  let fixture: ComponentFixture<ActivateaccountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActivateaccountComponent]
    });
    fixture = TestBed.createComponent(ActivateaccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
