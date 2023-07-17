import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnWhySAveComponent } from './learn-why-save.component';

describe('LearnWhySAveComponent', () => {
  let component: LearnWhySAveComponent;
  let fixture: ComponentFixture<LearnWhySAveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LearnWhySAveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LearnWhySAveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
