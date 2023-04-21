import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitAlertComponent } from './swit-alert.component';

describe('SwitAlertComponent', () => {
  let component: SwitAlertComponent;
  let fixture: ComponentFixture<SwitAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwitAlertComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SwitAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
