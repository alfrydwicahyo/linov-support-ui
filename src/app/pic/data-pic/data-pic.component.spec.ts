import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataPicComponent } from './data-pic.component';

describe('DataPicComponent', () => {
  let component: DataPicComponent;
  let fixture: ComponentFixture<DataPicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataPicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataPicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
