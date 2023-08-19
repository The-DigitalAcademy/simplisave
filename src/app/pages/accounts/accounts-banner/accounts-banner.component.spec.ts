import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsBannerComponent } from './accounts-banner.component';

describe('AccountsBannerComponent', () => {
  let component: AccountsBannerComponent;
  let fixture: ComponentFixture<AccountsBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountsBannerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountsBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
