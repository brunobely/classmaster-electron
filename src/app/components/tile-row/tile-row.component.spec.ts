import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TileRowComponent } from './tile-row.component';

describe('TileRowComponent', () => {
  let component: TileRowComponent;
  let fixture: ComponentFixture<TileRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TileRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TileRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
