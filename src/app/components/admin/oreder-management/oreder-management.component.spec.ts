import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrederManagementComponent } from './oreder-management.component';

describe('OrederManagementComponent', () => {
  let component: OrederManagementComponent;
  let fixture: ComponentFixture<OrederManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrederManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrederManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
