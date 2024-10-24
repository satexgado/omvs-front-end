import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTypeMissionComponent } from './add-type-mission.component';

describe('AddTypeMissionComponent', () => {
  let component: AddTypeMissionComponent;
  let fixture: ComponentFixture<AddTypeMissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTypeMissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTypeMissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
