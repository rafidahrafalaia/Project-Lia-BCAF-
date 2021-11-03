import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputArchiveComponent } from './input-archive.component';

describe('InputArchiveComponent', () => {
  let component: InputArchiveComponent;
  let fixture: ComponentFixture<InputArchiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputArchiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
