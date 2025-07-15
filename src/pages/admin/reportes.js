import { apiFetch } from '../../utils/api.js';
import { obtenerToken } from '../../utils/authGuard.js';

const app = document.getElementById('app');

const cargarReportesAdmin = async () => {
  app.innerHTML = '<p class="text-center text-blue-700">Cargando reportes...</p>';

  const reportes = await apiFetch('https://backend-nuevooooo-1.onrender.com/admin/reportes', 'GET', null, obtenerToken());

  if (!reportes.length) {
    return app.innerHTML = '<p class="text-center text-red-600 mt-10">No hay reportes disponibles.</p>';
  }

  app.innerHTML = `
    <div class="max-w-6xl mx-auto p-6">
      <h2 class="text-2xl font-bold text-center mb-6 text-[#4EF5A7]">Reportes Generales</h2>
      <div class="overflow-x-auto shadow rounded bg-white">
        <table class="w-full text-sm text-left border">
          <thead class="bg-[#4EF5DF] text-white">
            <tr>
              <th class="p-3">Alumno</th>
              <th class="p-3">Fecha</th>
              <th class="p-3">Tipo</th>
              <th class="p-3">Profesor</th>
              <th class="p-3">Detalles</th>
            </tr>
          </thead>
          <tbody>
            ${reportes.map(rep => `
              <tr class="border-t">
                <td class="p-3">${rep.nombre_alumno}</td>
                <td class="p-3">${new Date(rep.fecha).toLocaleDateString()}</td>
                <td class="p-3">${rep.tipo}</td>
                <td class="p-3">${rep.nombre_profesor}</td>
                <td class="p-3 whitespace-pre-line">${rep.detalles}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
      <div class="text-center mt-6">
        <button id="volverBtn" class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded">Volver</button>
      </div>
    </div>
  `;

  document.getElementById('volverBtn').addEventListener('click', () => {
    import('./dashboard.js').then(mod => mod.default());
  });
};

export default cargarReportesAdmin;
