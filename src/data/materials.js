// src/data/materials.js

export const colors = [
  { id: 'rojo', name: 'Rojo', hex: '#ef4444' },
  { id: 'negro', name: 'Negro', hex: '#000000' },
  { id: 'marron', name: 'Marrón', hex: '#78350f' },
  { id: 'azul', name: 'Azul', hex: '#3b82f6' },
  { id: 'celeste', name: 'Celeste', hex: '#7dd3fc' },
  { id: 'verde-amarillo', name: 'Verde/Amarillo', hex: 'linear-gradient(135deg, #22c55e 50%, #eab308 50%)' },
  { id: 'blanco', name: 'Blanco', hex: '#ffffff' }
];

export const materialCategories = [
  {
    id: 'protecciones',
    name: 'Protecciones (Térmicas y Disyuntores)',
    items: [
      { id: 't-6a', name: 'Térmica bipolar 6 A' },
      { id: 't-10a', name: 'Térmica bipolar 10 A' },
      { id: 't-16a', name: 'Térmica bipolar 16 A' },
      { id: 't-20a', name: 'Térmica bipolar 20 A' },
      { id: 't-25a', name: 'Térmica bipolar 25 A' },
      { id: 't-32a', name: 'Térmica bipolar 32 A' },
      { id: 't-40a', name: 'Térmica bipolar 40 A' },
      { id: 't-50a', name: 'Térmica bipolar 50 A' },
      { id: 't-63a', name: 'Térmica bipolar 63 A' },
      { id: 'd-25-30', name: 'Disyuntor bipolar 25 A – 30 mA' },
      { id: 'd-40-30', name: 'Disyuntor bipolar 40 A – 30 mA' },
      { id: 'd-63-30', name: 'Disyuntor bipolar 63 A – 30 mA' },
      { id: 'sobretension', name: 'Protector de sobretensión' }
    ]
  },
  {
    id: 'tableros',
    name: 'Tableros y Accesorios',
    items: [
      { id: 'tab-emb-4', name: 'Tablero embutir 4 módulos' },
      { id: 'tab-emb-8', name: 'Tablero embutir 8 módulos' },
      { id: 'tab-emb-12', name: 'Tablero embutir 12 módulos' },
      { id: 'tab-emb-24', name: 'Tablero embutir 24 módulos' },
      { id: 'tab-sup-4', name: 'Tablero superficie 4 módulos' },
      { id: 'tab-sup-8', name: 'Tablero superficie 8 módulos' },
      { id: 'tab-sup-12', name: 'Tablero superficie 12 módulos' },
      { id: 'tab-sup-24', name: 'Tablero superficie 24 módulos' },
      { id: 'riel-din', name: 'Riel DIN (metro)' },
      { id: 'barra-neutro', name: 'Barra de neutro' },
      { id: 'barra-tierra', name: 'Barra de puesta a tierra' },
      { id: 'eti-tablero', name: 'Etiquetas para tableros' }
    ]
  },
  {
    id: 'canerias',
    name: 'Cañerías y Accesorios',
    items: [
      { id: 'corr-16', name: 'Caño corrugado 16 mm (rollo)' },
      { id: 'corr-20', name: 'Caño corrugado 20 mm (rollo)' },
      { id: 'corr-25', name: 'Caño corrugado 25 mm (rollo)' },
      { id: 'rig-20', name: 'Caño rígido PVC 20 mm (tira)' },
      { id: 'rig-25', name: 'Caño rígido PVC 25 mm (tira)' },
      { id: 'curvas', name: 'Curvas' },
      { id: 'codos-90', name: 'Codos de 90°' },
      { id: 'cuplas', name: 'Cuplas' },
      { id: 'uniones', name: 'Uniones' },
      { id: 'conectores', name: 'Conectores' },
      { id: 'boquillas', name: 'Boquillas' },
      { id: 'grapas-cano', name: 'Grapas para caño' },
      { id: 'precintos', name: 'Precintos (paquete)' }
    ]
  },
  {
    id: 'cajas',
    name: 'Cajas',
    items: [
      { id: 'caja-oct', name: 'Caja octogonal para techo' },
      { id: 'caja-rect', name: 'Caja rectangular 5×10' },
      { id: 'caja-cuad', name: 'Caja cuadrada 10×10' },
      { id: 'caja-paso', name: 'Caja de paso' },
      { id: 'caja-estanca', name: 'Caja estanca para exterior' }
    ]
  },
  {
    id: 'conductores',
    name: 'Conductores (Cables)',
    items: [
      { id: 'cab-1.5', name: 'Cable de 1,5 mm² (rollo)', hasColors: true },
      { id: 'cab-2.5', name: 'Cable de 2,5 mm² (rollo)', hasColors: true },
      { id: 'cab-4.0', name: 'Cable de 4 mm² (rollo)', hasColors: true },
      { id: 'cab-6.0', name: 'Cable de 6 mm² (rollo)', hasColors: true },
      { id: 'cab-10.0', name: 'Cable de 10 mm² (rollo)', hasColors: true },
      { id: 'cab-16.0', name: 'Cable de 16 mm² (rollo)', hasColors: true }
    ]
  },
  {
    id: 'llaves-tomas',
    name: 'Llaves, Tomas y Tapas',
    items: [
      { id: 'llave-sim', name: 'Llave simple (módulo)' },
      { id: 'llave-dob', name: 'Llave doble (módulo)' },
      { id: 'llave-com', name: 'Llave combinada (módulo)' },
      { id: 'llave-con', name: 'Llave de conmutación (módulo)' },
      { id: 'pulsador', name: 'Pulsador (módulo)' },
      { id: 'toma-10a', name: 'Tomacorriente 10 A (módulo)' },
      { id: 'toma-20a', name: 'Tomacorriente 20 A (módulo)' },
      { id: 'toma-tierra', name: 'Toma con puesta a tierra (módulo)' },
      { id: 'bastidores', name: 'Bastidores' },
      { id: 'tapas', name: 'Tapas' }
    ]
  },
  {
    id: 'iluminacion',
    name: 'Iluminación',
    items: [
      { id: 'porta', name: 'Portalámparas' },
      { id: 'rosetas', name: 'Rosetas' },
      { id: 'lumi-led', name: 'Luminarias LED' },
      { id: 'plafones', name: 'Plafones' },
      { id: 'ref-led', name: 'Reflectores LED' },
      { id: 'tubos-led', name: 'Tubos LED' },
      { id: 'zocalos', name: 'Zócalos' }
    ]
  },
// src/data/materials.js (Modificar solo la parte de tornillos)
    {
      id: 'conexion-fijacion',
      name: 'Conexión, Tierra y Fijación',
      items: [
        { id: 'borneras', name: 'Borneras' },
        { id: 'regletas', name: 'Regletas' },
        { id: 'con-rapidos', name: 'Conectores rápidos' },
        { id: 'term-ojal', name: 'Terminales tipo ojal' },
        { id: 'term-horq', name: 'Terminales tipo horquilla' },
        { id: 'term-tub', name: 'Terminales tubulares' },
        { id: 'cinta-aisla', name: 'Cinta aisladora' },
        { id: 'tubo-termo', name: 'Tubo termocontraíble' },
        { id: 'jabalina', name: 'Jabalina de cobre' },
        { id: 'con-jaba', name: 'Conector para jabalina' },
        { id: 'caja-insp', name: 'Caja de inspección p/ jabalina' },
        { id: 'tarugos', name: 'Tarugos' },
        { id: 'tornillos', name: 'Tornillos', hasMms: true }, // <-- 
        { id: 'arandelas', name: 'Arandelas' },
        { id: 'abrazaderas', name: 'Abrazaderas' },
        { id: 'grampas-cab', name: 'Grampas para cable' }
      ]
    }
];