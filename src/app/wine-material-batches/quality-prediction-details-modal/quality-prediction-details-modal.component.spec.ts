import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualityPredictionDetailsModalComponent } from './quality-prediction-details-modal.component';

describe('QualityPredictionDetailsModalComponent', () => {
  let component: QualityPredictionDetailsModalComponent;
  let fixture: ComponentFixture<QualityPredictionDetailsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QualityPredictionDetailsModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QualityPredictionDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
