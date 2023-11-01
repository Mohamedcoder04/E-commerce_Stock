import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCmdComponent } from './new-cmd.component';

describe('NewCmdComponent', () => {
  let component: NewCmdComponent;
  let fixture: ComponentFixture<NewCmdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewCmdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCmdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
