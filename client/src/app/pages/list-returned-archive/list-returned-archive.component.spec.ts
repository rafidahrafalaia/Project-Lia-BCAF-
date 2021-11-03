import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListReturnedArchiveComponent } from './list-returned-archive.component';

describe('ListReturnedArchiveComponent', () => {
  let component: ListReturnedArchiveComponent;
  let fixture: ComponentFixture<ListReturnedArchiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListReturnedArchiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListReturnedArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
