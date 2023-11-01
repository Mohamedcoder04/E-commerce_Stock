import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersByCategoryComponent } from './orders-by-category.component';

describe('OrdersByCategoryComponent', () => {
  let component: OrdersByCategoryComponent;
  let fixture: ComponentFixture<OrdersByCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdersByCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersByCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
