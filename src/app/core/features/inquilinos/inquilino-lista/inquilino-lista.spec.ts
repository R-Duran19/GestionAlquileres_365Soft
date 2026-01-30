import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InquilinoLista } from './inquilino-lista';

describe('InquilinoLista', () => {
  let component: InquilinoLista;
  let fixture: ComponentFixture<InquilinoLista>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InquilinoLista]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InquilinoLista);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
