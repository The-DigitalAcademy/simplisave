import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopPartComponent } from './top-part.component';

describe('TopPartComponent', () => {
  let component: TopPartComponent;
  let fixture: ComponentFixture<TopPartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopPartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
