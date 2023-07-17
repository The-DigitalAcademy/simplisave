import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnOfferComponent } from './learn-offer.component';

describe('LearnOfferComponent', () => {
  let component: LearnOfferComponent;
  let fixture: ComponentFixture<LearnOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LearnOfferComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LearnOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
