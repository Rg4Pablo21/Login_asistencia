// src/profesor/reportes.js
import cargarDashboardProfesor from './dashboard.js';

const app = document.getElementById('app');

// Reportes simulados
const reportes = [
  {
    id: 1,
    alumno: 'Juan Pérez',
    tipo: 'Uniforme',
    fecha: '2025-07-01',
    observaciones: 'Falta de suéter',
  },
  {
    id: 2,
    alumno: 'María López',
    tipo: 'Correo',
    fecha: '2025-07-02',
    observaciones: 'Correo enviado a padre por inasistencia',
  },
  {
    id: 3,
    alumno: 'Carlos Ruiz',
    tipo: 'Uniforme',
    fecha: '2025-07-03',
    observaciones: 'Zapatos incorrectos',
  },
];

const renderReportes = () => {
  app.innerHTML = `
    <div class="max-w-4xl mx-auto p-6">
      <h2 class="text-2xl font-bold mb-4 text-blue-800">Reportes Enviados</h2>
      <button id="btnVolver" class="btn-primary mb-4 bg-gray-500 hover:bg-gray-600">⬅ Volver</button>
      <div class="overflow-x-auto">
        <table class="w-full bg-white shadow rounded overflow-hidden">
          <thead class="bg-blue-100">
            <tr>
              <th class="p-2 text-left">Alumno</th>
              <th class="p-2">Tipo</th>
              <th class="p-2">Fecha</th>
              <th class="p-2">Observaciones</th>
            </tr>
          </thead>
          <tbody>
            ${reportes.map(r => `
              <tr class="border-t">
                <td class="p-2">${r.alumno}</td>
                <td class="p-2 text-center">${r.tipo}</td>
                <td class="p-2 text-center">${r.fecha}</td>
                <td class="p-2">${r.observaciones}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;

  document.getElementById('btnVolver').addEventListener('click', () => cargarDashboardProfesor());
};

export default renderReportes;
