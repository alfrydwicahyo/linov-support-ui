import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTicketComponent } from './data-ticket.component';

describe('DataTicketComponent', () => {
  let component: DataTicketComponent;
  let fixture: ComponentFixture<DataTicketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataTicketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
