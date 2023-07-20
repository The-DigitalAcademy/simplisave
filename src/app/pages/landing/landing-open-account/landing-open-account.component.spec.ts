import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingOpenAccountComponent } from './landing-open-account.component';

describe('LandingOpenAccountComponent', () => {
  let component: LandingOpenAccountComponent;
  let fixture: ComponentFixture<LandingOpenAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingOpenAccountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingOpenAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
