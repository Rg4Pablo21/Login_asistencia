// src/profesor/uniforme.js
import cargarDashboardProfesor from './dashboard.js';

const app = document.getElementById('app');

// Datos simulados de alumnos
const alumnos = [
  { id: 1, nombre: "Juan Pérez" },
  { id: 2, nombre: "María López" },
  { id: 3, nombre: "Carlos Ruiz" },
];

const renderUniformes = () => {
  app.innerHTML = `
    <div class="max-w-4xl mx-auto p-6">
      <h2 class="text-2xl font-bold mb-4 text-blue-800">Reportes de Uniforme</h2>
      <button id="btnVolver" class="btn-primary mb-4 bg-gray-500 hover:bg-gray-600">⬅ Volver</button>
      <table class="w-full bg-white shadow rounded">
        <thead class="bg-blue-100">
          <tr>
            <th class="p-2 text-left">Alumno</th>
            <th class="p-2 text-center">Uniforme completo</th>
            <th class="p-2 text-center">Observaciones</th>
          </tr>
        </thead>
        <tbody>
          ${alumnos.map(a => `
            <tr class="border-t">
              <td class="p-2">${a.nombre}</td>
              <td class="text-center">
                <input type="checkbox" checked disabled />
              </td>
              <td class="text-center">Sin observaciones</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;

  document.getElementById('btnVolver').addEventListener('click', () => cargarDashboardProfesor());
};

export default renderUniformes;
