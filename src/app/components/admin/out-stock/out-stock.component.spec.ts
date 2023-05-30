import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutStockComponent } from './out-stock.component';

describe('OutStockComponent', () => {
  let component: OutStockComponent;
  let fixture: ComponentFixture<OutStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutStockComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OutStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
