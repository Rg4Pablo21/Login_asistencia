import cargarDashboardProfesor from './dashboard.js';

const app = document.getElementById('app');
let alumnos = [];
let asistencia = [];
let gradoSeleccionado = null;

const gradosSimulados = [
  { id: 1, nombre: '1ro Básico A' },
  { id: 2, nombre: '2do Básico B' },
  { id: 3, nombre: '3ro Básico C' }
];

const alumnosSimulados = {
  1: [
    { id: 1, nombre: 'Ana López' },
    { id: 2, nombre: 'Carlos Pérez' }
  ],
  2: [
    { id: 3, nombre: 'Luisa Martínez' },
    { id: 4, nombre: 'David Ramírez' }
  ],
  3: [
    { id: 5, nombre: 'Sofía Gómez' },
    { id: 6, nombre: 'Andrés Díaz' }
  ]
};

const cargarAsistencia = () => {
  app.innerHTML = `
    <div class="max-w-4xl mx-auto p-6">
      <h2 class="text-2xl font-bold mb-4 text-blue-800">Seleccionar grado</h2>
      <select id="selectorGrado" class="p-2 border rounded mb-4 w-full">
        <option value="">-- Selecciona un grado --</option>
        ${gradosSimulados.map(g => `<option value="${g.id}">${g.nombre}</option>`).join('')}
      </select>
      <div id="contenedorAsistencia"></div>
    </div>
  `;

  document.getElementById('selectorGrado').addEventListener('change', e => {
    const gradoId = e.target.value;
    gradoSeleccionado = gradosSimulados.find(g => g.id == gradoId);
    alumnos = alumnosSimulados[gradoId] || [];
    asistencia = {};
    alumnos.forEach(a => asistencia[a.id] = { presente: false, uniforme: {}, observaciones: "" });
    renderAsistencia(gradoSeleccionado.nombre);
  });
};

const renderAsistencia = (gradoNombre) => {
  const cont = document.getElementById('contenedorAsistencia');
  cont.innerHTML = `
    <h2 class="text-xl font-bold mb-4 text-blue-700">Asistencia - ${gradoNombre}</h2>
    <div class="flex justify-between mb-4 flex-wrap gap-2">
      <button id="btnTodosPresentes" class="btn-primary">Todos presentes</button>
      <button id="btnTodosAusentes" class="btn-primary bg-red-500 hover:bg-red-600">Todos ausentes</button>
      <button id="btnAgregarAlumno" class="btn-primary bg-blue-600 hover:bg-blue-700">➕ Agregar alumno</button>
      <button id="btnVolver" class="btn-primary bg-gray-500 hover:bg-gray-600">⬅ Volver</button>
    </div>
    <table class="w-full bg-white shadow rounded overflow-hidden">
      <thead class="bg-blue-100">
        <tr>
          <th class="p-2 text-left">Nombre</th>
          <th class="p-2">Presente</th>
          <th class="p-2">Uniforme</th>
          <th class="p-2">Eliminar</th>
        </tr>
      </thead>
      <tbody>
        ${alumnos.map(al => `
          <tr class="border-t">
            <td class="p-2">${al.nombre}</td>
            <td class="text-center">
              <input type="checkbox" data-id="${al.id}" class="presente-check">
            </td>
            <td class="text-center">
              <button class="btn-uniforme" data-id="${al.id}">Uniforme</button>
            </td>
            <td class="text-center">
              <button class="btn-eliminar" data-id="${al.id}" data-nombre="${al.nombre}">🗑️</button>
            </td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;

  document.getElementById('btnVolver').addEventListener('click', () => cargarDashboardProfesor());
  document.getElementById('btnTodosPresentes').addEventListener('click', () => {
    document.querySelectorAll('.presente-check').forEach(c => c.checked = true);
    alumnos.forEach(a => asistencia[a.id].presente = true);
  });

  document.getElementById('btnTodosAusentes').addEventListener('click', () => {
    document.querySelectorAll('.presente-check').forEach(c => c.checked = false);
    alumnos.forEach(a => asistencia[a.id].presente = false);
  });

  document.getElementById('btnAgregarAlumno').addEventListener('click', () => {
    renderAgregarAlumnoModal();
  });

  document.querySelectorAll('.presente-check').forEach(input => {
    input.addEventListener('change', e => {
      const id = e.target.dataset.id;
      asistencia[id].presente = e.target.checked;
    });
  });

  document.querySelectorAll('.btn-uniforme').forEach(btn => {
    btn.addEventListener('click', e => {
      const id = e.target.dataset.id;
      renderUniformeModal(id);
    });
  });

  document.querySelectorAll('.btn-eliminar').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const alumnoId = e.target.dataset.id;
      alumnos = alumnos.filter(a => a.id != alumnoId);
      cargarAsistencia();  // Recargar todo para simular eliminación
    });
  });
};

const renderAgregarAlumnoModal = () => {
  const nombre = prompt('Nombre del nuevo alumno:');
  if (!nombre) return;

  const nuevoId = Date.now();
  alumnos.push({ id: nuevoId, nombre });
  asistencia[nuevoId] = { presente: false, uniforme: {}, observaciones: "" };
  renderAsistencia(gradoSeleccionado.nombre);
};

const renderUniformeModal = (alumnoId) => {
  const partes = ['playera', 'pantalon', 'zapatos', 'sueter', 'corte_pelo'];
  const observaciones = prompt(`Detalles u observaciones para el uniforme del alumno ${alumnoId}:`) || '';
  const uniformeData = {};
  partes.forEach(p => {
    uniformeData[p] = confirm(`¿Tiene ${p}?`);
  });
  uniformeData.observaciones = observaciones;
  asistencia[alumnoId].uniforme = uniformeData;
  alert('✅ Uniforme guardado');
};

export default cargarAsistencia;
