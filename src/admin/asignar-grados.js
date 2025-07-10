import { apiFetch } from '../utils/api.js';
import cargarAdminDashboard from './dashboard.js';

const app = document.getElementById('app');

const cargarAsignarGrados = async () => {
  const profesores = await apiFetch('/admin/profesores');
  const niveles = await apiFetch('/admin/niveles');

  app.innerHTML = `
    <div class="p-6 max-w-3xl mx-auto">
      <h2 class="text-2xl font-bold mb-4 text-[#4EF5A7] text-center">Asignar Grados a Profesores</h2>

      <form id="formAsignacion" class="space-y-4 bg-white p-4 rounded shadow mb-6">
        <label class="block">
          <span class="font-semibold">Profesor:</span>
          <select name="profesor_id" required class="w-full p-2 border rounded">
            <option value="">Selecciona un profesor</option>
            ${profesores.map(p => `<option value="${p.id}">${p.nombre}</option>`).join('')}
          </select>
        </label>

        <label class="block">
          <span class="font-semibold">Grado:</span>
          <select name="grado_id" required class="w-full p-2 border rounded">
            <option value="">Selecciona un grado</option>
            ${niveles.flatMap(n =>
              n.grados.map(g => `<option value="${g.id}">${n.nombre} - ${g.nombre}</option>`)
            ).join('')}
          </select>
        </label>

        <button type="submit" class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">Asignar</button>
      </form>

      <button id="btnVolver" class="bg-gray-400 hover:bg-gray-500 px-4 py-2 rounded">⬅ Volver</button>
    </div>
  `;

  document.getElementById('formAsignacion').addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const data = Object.fromEntries(form.entries());
    await apiFetch('/admin/asignar-grado', 'POST', data);
    alert('✅ Grado asignado correctamente');
    cargarAsignarGrados();
  });

  document.getElementById('btnVolver').addEventListener('click', () => {
    cargarAdminDashboard();
  });
};

export default cargarAsignarGrados;
