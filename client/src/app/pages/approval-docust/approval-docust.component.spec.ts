import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalDocustComponent } from './approval-docust.component';

describe('ApprovalDocustComponent', () => {
  let component: ApprovalDocustComponent;
  let fixture: ComponentFixture<ApprovalDocustComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovalDocustComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovalDocustComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
