import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnVsInvestComponent } from './learn-vs-invest.component';

describe('LearnVsInvestComponent', () => {
  let component: LearnVsInvestComponent;
  let fixture: ComponentFixture<LearnVsInvestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LearnVsInvestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LearnVsInvestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
