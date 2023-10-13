import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarTypeListComponent } from './car-type-list.component';

describe('CarTypeListComponent', () => {
  let component: CarTypeListComponent;
  let fixture: ComponentFixture<CarTypeListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarTypeListComponent]
    });
    fixture = TestBed.createComponent(CarTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
