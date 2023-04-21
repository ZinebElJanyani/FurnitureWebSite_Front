import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OredersListComponent } from './oreders-list.component';

describe('OredersListComponent', () => {
  let component: OredersListComponent;
  let fixture: ComponentFixture<OredersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OredersListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OredersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
