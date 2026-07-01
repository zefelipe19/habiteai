import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Announce } from './announce';

describe('Announce', () => {
  let component: Announce;
  let fixture: ComponentFixture<Announce>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Announce]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Announce);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
