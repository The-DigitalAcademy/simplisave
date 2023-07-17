import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnBannerComponent } from './learn-banner.component';

describe('LearnBannerComponent', () => {
  let component: LearnBannerComponent;
  let fixture: ComponentFixture<LearnBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LearnBannerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LearnBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
