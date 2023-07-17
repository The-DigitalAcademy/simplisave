import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnBestSuitedComponent } from './learn-best-suited.component';

describe('LearnBestSuitedComponent', () => {
  let component: LearnBestSuitedComponent;
  let fixture: ComponentFixture<LearnBestSuitedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LearnBestSuitedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LearnBestSuitedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
