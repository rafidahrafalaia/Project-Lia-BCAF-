import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowAllComponent } from './borrow-all.component';

describe('BorrowAllComponent', () => {
  let component: BorrowAllComponent;
  let fixture: ComponentFixture<BorrowAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BorrowAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BorrowAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
