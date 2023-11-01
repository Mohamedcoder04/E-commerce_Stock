import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MvtstkComponent } from './mvtstk.component';

describe('MvtstkComponent', () => {
  let component: MvtstkComponent;
  let fixture: ComponentFixture<MvtstkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MvtstkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MvtstkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
