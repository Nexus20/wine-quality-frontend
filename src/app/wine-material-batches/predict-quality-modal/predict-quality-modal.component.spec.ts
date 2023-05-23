import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PredictQualityModalComponent } from './predict-quality-modal.component';

describe('PredictQualityModalComponent', () => {
  let component: PredictQualityModalComponent;
  let fixture: ComponentFixture<PredictQualityModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PredictQualityModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PredictQualityModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
