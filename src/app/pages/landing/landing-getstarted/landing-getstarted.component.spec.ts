import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingGetstartedComponent } from './landing-getstarted.component';

describe('LandingGetstartedComponent', () => {
  let component: LandingGetstartedComponent;
  let fixture: ComponentFixture<LandingGetstartedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingGetstartedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingGetstartedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
