import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadPhaseDatasetModalComponent } from './upload-phase-dataset-modal.component';

describe('UploadPhaseDatasetModalComponent', () => {
  let component: UploadPhaseDatasetModalComponent;
  let fixture: ComponentFixture<UploadPhaseDatasetModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadPhaseDatasetModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadPhaseDatasetModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
