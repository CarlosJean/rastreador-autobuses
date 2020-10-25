import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationSendingComponent } from './location-sending.component';

describe('LocationSendingComponent', () => {
  let component: LocationSendingComponent;
  let fixture: ComponentFixture<LocationSendingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationSendingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationSendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
