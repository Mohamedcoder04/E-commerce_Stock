import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewClientFournisseurComponent } from './new-client-fournisseur.component';

describe('NewClientFournisseurComponent', () => {
  let component: NewClientFournisseurComponent;
  let fixture: ComponentFixture<NewClientFournisseurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewClientFournisseurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewClientFournisseurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
