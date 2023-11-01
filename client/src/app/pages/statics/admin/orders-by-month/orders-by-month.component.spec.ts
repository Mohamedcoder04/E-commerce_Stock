import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersByMonthComponent } from './orders-by-month.component';

describe('OrdersByMonthComponent', () => {
  let component: OrdersByMonthComponent;
  let fixture: ComponentFixture<OrdersByMonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdersByMonthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersByMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
