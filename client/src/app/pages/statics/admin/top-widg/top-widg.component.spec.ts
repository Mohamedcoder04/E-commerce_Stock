import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopWidgComponent } from './top-widg.component';

describe('TopWidgComponent', () => {
  let component: TopWidgComponent;
  let fixture: ComponentFixture<TopWidgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopWidgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopWidgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
