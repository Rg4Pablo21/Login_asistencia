import { apiFetch } from '../utils/api.js';
import { obtenerToken } from '../utils/authGuard.js';
import cargarAdminDashboard from './dashboard.js';

const app = document.getElementById('app');

const cargarGestionProfesores = async () => {
  const token = obtenerToken();
  const profesores = await apiFetch('https://backend-nuevooooo-1.onrender.com/admin/profesores', 'GET', null, token);

  if (!Array.isArray(profesores)) {
    app.innerHTML = `<p class="text-red-500 text-center">❌ Error al cargar profesores. Verifica tu acceso.</p>`;
    return;
  }

  app.innerHTML = `
    <div class="p-6">
      <h2 class="text-lg font-bold mb-4">Gestionar Profesores</h2>
      <button id="backBtn" class="mb-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">Volver</button>
      
      <form id="formAgregar" class="mb-4 space-y-2 bg-white p-4 rounded shadow">
        <input type="text" name="nombre" placeholder="Nombre" required class="w-full px-3 py-2 border rounded" />
        <input type="email" name="correo" placeholder="Correo" required class="w-full px-3 py-2 border rounded" />
        <input type="password" name="password" placeholder="Contraseña" required class="w-full px-3 py-2 border rounded" />
        <button type="submit" class="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">
          Agregar Profesor
        </button>
      </form>

      <h3 class="text-md font-semibold mb-2">Lista de Profesores</h3>
      <div id="listaProfesores" class="space-y-2">
        ${profesores.map(p => `
          <div class="flex justify-between items-center p-2 bg-white rounded shadow">
            <span>${p.nombre} (${p.correo})</span>
            <button class="eliminarBtn bg-red-500 text-white px-2 py-1 rounded" data-id="${p.id}">Eliminar</button>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  document.getElementById('formAgregar').addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = e.target;
    const nuevoProfesor = {
      nombre: form.nombre.value,
      correo: form.correo.value,
      password: form.password.value
    };

    await apiFetch('/admin/profesores', 'POST', nuevoProfesor, token);
    alert('Profesor agregado');
    cargarGestionProfesores();
  });

  document.querySelectorAll('.eliminarBtn').forEach(btn =>
    btn.addEventListener('click', async () => {
      await apiFetch(`/admin/profesores/${btn.dataset.id}`, 'DELETE', null, token);
      alert('Profesor eliminado');
      cargarGestionProfesores();
    })
  );

  document.getElementById('backBtn').addEventListener('click', () => {
    cargarAdminDashboard();
  });
};

export default cargarGestionProfesores;
