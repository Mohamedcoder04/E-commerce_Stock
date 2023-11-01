import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCategorieComponent } from './new-categorie.component';

describe('NewCategorieComponent', () => {
  let component: NewCategorieComponent;
  let fixture: ComponentFixture<NewCategorieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewCategorieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCategorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
