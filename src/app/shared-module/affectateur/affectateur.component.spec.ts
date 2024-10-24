import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AffectateurComponent } from './affectateur.component';

describe('AffectateurComponent', () => {
  let component: AffectateurComponent;
  let fixture: ComponentFixture<AffectateurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AffectateurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AffectateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
