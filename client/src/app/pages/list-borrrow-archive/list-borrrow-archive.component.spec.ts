import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBorrrowArchiveComponent } from './list-borrrow-archive.component';

describe('ListBorrrowArchiveComponent', () => {
  let component: ListBorrrowArchiveComponent;
  let fixture: ComponentFixture<ListBorrrowArchiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListBorrrowArchiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListBorrrowArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
