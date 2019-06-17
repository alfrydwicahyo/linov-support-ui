import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataAgentComponent } from './data-agent.component';

describe('DataAgentComponent', () => {
  let component: DataAgentComponent;
  let fixture: ComponentFixture<DataAgentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataAgentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
