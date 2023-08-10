import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageModalComponent } from './manage-modal.component';

describe('ManageModalComponent', () => {
  let component: ManageModalComponent;
  let fixture: ComponentFixture<ManageModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
