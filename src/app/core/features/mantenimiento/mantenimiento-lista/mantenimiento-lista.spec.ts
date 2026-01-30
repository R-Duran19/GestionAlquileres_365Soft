import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantenimientoListaComponent } from './mantenimiento-lista';

describe('MantenimientoLista', () => {
  let component: MantenimientoListaComponent;
  let fixture: ComponentFixture<MantenimientoListaComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MantenimientoListaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MantenimientoListaComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
