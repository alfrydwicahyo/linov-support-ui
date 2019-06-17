import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormUpdtAgentComponent } from './form-updt-agent.component';

describe('FormUpdtAgentComponent', () => {
  let component: FormUpdtAgentComponent;
  let fixture: ComponentFixture<FormUpdtAgentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormUpdtAgentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormUpdtAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
