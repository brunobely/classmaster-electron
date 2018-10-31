import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonStripComponent } from './button-strip.component';

describe('ButtonStripComponent', () => {
  let component: ButtonStripComponent;
  let fixture: ComponentFixture<ButtonStripComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonStripComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonStripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
