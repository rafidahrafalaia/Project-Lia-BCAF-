import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalArchiveComponent } from './approval-archive.component';

describe('ApprovalArchiveComponent', () => {
  let component: ApprovalArchiveComponent;
  let fixture: ComponentFixture<ApprovalArchiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovalArchiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovalArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
