import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListReturnedDocustComponent } from './list-returned-docust.component';

describe('ListReturnedDocustComponent', () => {
  let component: ListReturnedDocustComponent;
  let fixture: ComponentFixture<ListReturnedDocustComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListReturnedDocustComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListReturnedDocustComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
