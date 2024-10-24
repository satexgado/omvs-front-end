import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PluginMissionComponent } from './plugin-mission.component';

describe('PluginMissionComponent', () => {
  let component: PluginMissionComponent;
  let fixture: ComponentFixture<PluginMissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PluginMissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PluginMissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
