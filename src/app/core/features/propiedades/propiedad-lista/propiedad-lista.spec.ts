import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropiedadLista } from './propiedad-lista';

describe('PropiedadLista', () => {
  let component: PropiedadLista;
  let fixture: ComponentFixture<PropiedadLista>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropiedadLista]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropiedadLista);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
