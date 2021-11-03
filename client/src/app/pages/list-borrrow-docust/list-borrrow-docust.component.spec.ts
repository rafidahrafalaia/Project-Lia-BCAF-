import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBorrrowDocustComponent } from './list-borrrow-docust.component';

describe('ListBorrrowDocustComponent', () => {
  let component: ListBorrrowDocustComponent;
  let fixture: ComponentFixture<ListBorrrowDocustComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListBorrrowDocustComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListBorrrowDocustComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
