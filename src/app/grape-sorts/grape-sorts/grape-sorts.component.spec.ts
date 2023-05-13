import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrapeSortsComponent } from './grape-sorts.component';

describe('GrapeSortsComponent', () => {
  let component: GrapeSortsComponent;
  let fixture: ComponentFixture<GrapeSortsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrapeSortsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrapeSortsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
