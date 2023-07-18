import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingNeedHelpComponent } from './landing-need-help.component';

describe('LandingNeedHelpComponent', () => {
  let component: LandingNeedHelpComponent;
  let fixture: ComponentFixture<LandingNeedHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingNeedHelpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingNeedHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
