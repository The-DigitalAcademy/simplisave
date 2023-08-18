import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqContentComponent } from './faq-content.component';

describe('FaqContentComponent', () => {
  let component: FaqContentComponent;
  let fixture: ComponentFixture<FaqContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FaqContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FaqContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
