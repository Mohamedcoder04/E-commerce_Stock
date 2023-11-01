import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartePageComponent } from './carte-page.component';

describe('CartePageComponent', () => {
  let component: CartePageComponent;
  let fixture: ComponentFixture<CartePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
