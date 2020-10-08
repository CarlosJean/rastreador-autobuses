import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationReceivingComponent } from './location-receiving.component';

describe('LocationReceivingComponent', () => {
  let component: LocationReceivingComponent;
  let fixture: ComponentFixture<LocationReceivingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationReceivingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationReceivingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
