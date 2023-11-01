import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPaiementComponent } from './new-paiement.component';

describe('NewPaiementComponent', () => {
  let component: NewPaiementComponent;
  let fixture: ComponentFixture<NewPaiementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewPaiementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPaiementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
