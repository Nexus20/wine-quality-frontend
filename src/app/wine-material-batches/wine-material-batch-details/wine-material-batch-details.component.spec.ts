import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WineMaterialBatchDetailsComponent } from './wine-material-batch-details.component';

describe('WineMaterialBatchDetailsComponent', () => {
  let component: WineMaterialBatchDetailsComponent;
  let fixture: ComponentFixture<WineMaterialBatchDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WineMaterialBatchDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WineMaterialBatchDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
