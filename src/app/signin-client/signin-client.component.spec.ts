import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SigninClientComponent } from './signin-client.component';

describe('SigninClientComponent', () => {
  let component: SigninClientComponent;
  let fixture: ComponentFixture<SigninClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SigninClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SigninClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
