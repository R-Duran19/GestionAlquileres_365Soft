import { Propiedad, TipoPropiedad, EstadoPropiedad } from './propiedad.model';

// Ejemplo de cómo usar los modelos
const propiedadEjemplo: Propiedad = {
  id: 1,
  nombre: "Apartamento Centro",
  direccion: {
    calle: "Av. Principal",
    numero: "123",
    ciudad: "Quito",
    estado: "Pichincha",
    codigoPostal: "170135",
    pais: "Ecuador"
  },
  tipo: TipoPropiedad.APARTAMENTO,
  caracteristicas: {
    metrosCuadrados: 85,
    habitaciones: 2,
    banos: 2,
    parqueaderos: 1,
    piso: 3,
    amoblado: true,
    mascotasPermitidas: false,
    serviciosIncluidos: ["agua", "luz", "internet"]
  },
  estado: EstadoPropiedad.OCUPADO,
  informacionFinanciera: {
    precioAlquiler: 450,
    depositoGarantia: 900,
    moneda: "USD",
    gastosAdministracion: 25,
    serviciosBasicosIncluidos: true,
    impuestosIncluidos: false
  },
  imagenes: [],
  fechaCreacion: new Date(),
  fechaActualizacion: new Date()
};

console.log('Modelo de propiedad creado:', propiedadEjemplo.nombre);