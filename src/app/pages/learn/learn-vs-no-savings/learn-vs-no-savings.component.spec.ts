import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnVsNoSavingsComponent } from './learn-vs-no-savings.component';

describe('LearnVsNoSavingsComponent', () => {
  let component: LearnVsNoSavingsComponent;
  let fixture: ComponentFixture<LearnVsNoSavingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LearnVsNoSavingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LearnVsNoSavingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
