import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnStepsComponent } from './learn-steps.component';

describe('LearnStepsComponent', () => {
  let component: LearnStepsComponent;
  let fixture: ComponentFixture<LearnStepsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LearnStepsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LearnStepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
