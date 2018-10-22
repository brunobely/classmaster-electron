import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyGridComponent } from './empty-grid.component';

describe('EmptyGridComponent', () => {
  let component: EmptyGridComponent;
  let fixture: ComponentFixture<EmptyGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmptyGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmptyGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
