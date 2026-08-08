import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrarTickets } from './administrar-tickets';

describe('AdministrarTickets', () => {
  let component: AdministrarTickets;
  let fixture: ComponentFixture<AdministrarTickets>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdministrarTickets],
    }).compileComponents();

    fixture = TestBed.createComponent(AdministrarTickets);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
