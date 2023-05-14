import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WineMaterialBatchCreateModalComponent } from './wine-material-batch-create-modal.component';

describe('WineMaterialBatchCreateModalComponent', () => {
  let component: WineMaterialBatchCreateModalComponent;
  let fixture: ComponentFixture<WineMaterialBatchCreateModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WineMaterialBatchCreateModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WineMaterialBatchCreateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
