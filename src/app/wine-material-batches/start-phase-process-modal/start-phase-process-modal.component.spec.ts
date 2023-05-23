import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartPhaseProcessModalComponent } from './start-phase-process-modal.component';

describe('StartPhaseProcessModalComponent', () => {
  let component: StartPhaseProcessModalComponent;
  let fixture: ComponentFixture<StartPhaseProcessModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartPhaseProcessModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StartPhaseProcessModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
