import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReciveArchiveComponent } from './recive-archive.component';

describe('ReciveArchiveComponent', () => {
  let component: ReciveArchiveComponent;
  let fixture: ComponentFixture<ReciveArchiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReciveArchiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReciveArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
