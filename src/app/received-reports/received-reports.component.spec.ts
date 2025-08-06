import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceivedReportsComponent } from './received-reports.component';

describe('ReceivedReportsComponent', () => {
  let component: ReceivedReportsComponent;
  let fixture: ComponentFixture<ReceivedReportsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReceivedReportsComponent]
    });
    fixture = TestBed.createComponent(ReceivedReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
