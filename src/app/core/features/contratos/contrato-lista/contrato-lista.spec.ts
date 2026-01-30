import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratoLista } from './contrato-lista';

describe('ContratoLista', () => {
  let component: ContratoLista;
  let fixture: ComponentFixture<ContratoLista>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContratoLista]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContratoLista);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
