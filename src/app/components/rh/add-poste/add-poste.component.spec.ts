import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPosteComponent } from './add-poste.component';

describe('AddPosteComponent', () => {
  let component: AddPosteComponent;
  let fixture: ComponentFixture<AddPosteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPosteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPosteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
