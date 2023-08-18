import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsSavingsAndInvestmentsComponent } from './accounts-savings-and-investments.component';

describe('AccountsSavingsAndInvestmentsComponent', () => {
  let component: AccountsSavingsAndInvestmentsComponent;
  let fixture: ComponentFixture<AccountsSavingsAndInvestmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountsSavingsAndInvestmentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountsSavingsAndInvestmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
