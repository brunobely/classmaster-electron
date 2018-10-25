import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderTextareaComponent } from './header-textarea.component';

describe('HeaderTextareaComponent', () => {
  let component: HeaderTextareaComponent;
  let fixture: ComponentFixture<HeaderTextareaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderTextareaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
