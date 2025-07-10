import { apiFetch } from '../utils/api.js';
import { obtenerToken } from '../utils/authGuard.js';
import cargarAdminDashboard from './dashboard.js';

const app = document.getElementById('app');

const cargarNiveles = async () => {
  const token = obtenerToken();
  const niveles = await apiFetch('https://backend-nuevooooo-1.onrender.com/admin/niveles', 'GET', null, token);

  if (!Array.isArray(niveles)) {
    app.innerHTML = `<p class="text-red-500 text-center">❌ Error al cargar niveles. Verifica tu acceso.</p>`;
    return;
  }

  app.innerHTML = `
    <div class="p-6 max-w-3xl mx-auto">
      <h2 class="text-2xl font-bold mb-4 text-center text-[#4EF5A7]">Gestionar Niveles y Grados</h2>

      <form id="formNivel" class="bg-white p-4 rounded shadow mb-6">
        <h3 class="font-semibold mb-2">Agregar Nivel</h3>
        <input type="text" name="nombre" placeholder="Nombre del nivel (Ej: Básico, Diversificado)" required />
        <button type="submit">Agregar Nivel</button>
      </form>

      <div id="nivelesContainer">
        ${niveles.map(nivel => `
          <div class="mb-6 p-4 bg-[#EFFFFA] rounded-lg shadow">
            <div class="flex justify-between items-center mb-2">
              <h4 class="text-lg font-semibold text-[#4ED4F5]">${nivel.nombre}</h4>
              <button data-id="${nivel.id}" class="btnEliminarNivel bg-red-500 hover:bg-red-600">Eliminar Nivel</button>
            </div>
            <form data-nivel="${nivel.id}" class="formGrado flex items-center gap-2 mb-2">
              <input type="text" name="nombre" placeholder="Agregar grado" required />
              <button type="submit">Agregar</button>
            </form>
            <ul class="ml-4 list-disc">
              ${nivel.grados.map(grado => `
                <li class="flex justify-between items-center">
                  ${grado.nombre}
                  <button data-id="${grado.id}" class="btnEliminarGrado text-red-500 hover:text-red-700">🗑</button>
                </li>
              `).join('')}
            </ul>
          </div>
        `).join('')}
      </div>

      <button id="btnVolver" class="mt-4 bg-gray-300 hover:bg-gray-400">⬅ Volver</button>
    </div>
  `;

  document.getElementById('formNivel').addEventListener('submit', async (e) => {
    e.preventDefault();
    const nombre = e.target.nombre.value;
    await apiFetch('/admin/niveles', 'POST', { nombre }, token);
    cargarNiveles();
  });

  document.querySelectorAll('.formGrado').forEach(form => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const nivel_id = e.target.getAttribute('data-nivel');
      const nombre = e.target.nombre.value;
      await apiFetch(`/admin/grados`, 'POST', { nombre, nivel_id }, token);
      cargarNiveles();
    });
  });

  document.querySelectorAll('.btnEliminarNivel').forEach(btn => {
    btn.addEventListener('click', async () => {
      if (confirm('¿Seguro que deseas eliminar este nivel y sus grados?')) {
        const id = btn.getAttribute('data-id');
        await apiFetch(`/admin/niveles/${id}`, 'DELETE', null, token);
        cargarNiveles();
      }
    });
  });

  document.querySelectorAll('.btnEliminarGrado').forEach(btn => {
    btn.addEventListener('click', async () => {
      if (confirm('¿Eliminar este grado?')) {
        const id = btn.getAttribute('data-id');
        await apiFetch(`/admin/grados/${id}`, 'DELETE', null, token);
        cargarNiveles();
      }
    });
  });

  document.getElementById('btnVolver').addEventListener('click', () => {
    cargarAdminDashboard();
  });
};

export default cargarNiveles;
