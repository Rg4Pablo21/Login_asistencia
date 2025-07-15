// src/profesor/correo.js
import cargarDashboardProfesor from './dashboard.js';

const app = document.getElementById('app');

// Datos simulados
const alumnos = [
  { id: 1, nombre: 'Juan Pérez', correo: 'juan@example.com' },
  { id: 2, nombre: 'María López', correo: 'maria@example.com' },
  { id: 3, nombre: 'Carlos Ruiz', correo: 'carlos@example.com' },
];

const renderCorreo = () => {
  app.innerHTML = `
    <div class="max-w-2xl mx-auto p-6">
      <h2 class="text-2xl font-bold mb-4 text-blue-800">Enviar Correo</h2>
      <button id="btnVolver" class="btn-primary mb-4 bg-gray-500 hover:bg-gray-600">⬅ Volver</button>
      <form id="formCorreo" class="bg-white shadow-md rounded p-4 space-y-4">
        <label class="block">
          Para:
          <select name="destino" class="w-full border p-2 rounded mt-1" required>
            <option value="">Seleccione un alumno</option>
            ${alumnos.map(a => `<option value="${a.correo}">${a.nombre} (${a.correo})</option>`).join('')}
          </select>
        </label>
        <label class="block">
          Asunto:
          <input type="text" name="asunto" class="w-full border p-2 rounded mt-1" required />
        </label>
        <label class="block">
          Mensaje:
          <textarea name="mensaje" class="w-full border p-2 rounded mt-1" rows="5" required></textarea>
        </label>
        <div class="flex justify-end">
          <button type="submit" class="btn-primary bg-green-600 hover:bg-green-700">📨 Enviar</button>
        </div>
      </form>
    </div>
  `;

  document.getElementById('btnVolver').addEventListener('click', () => cargarDashboardProfesor());

  document.getElementById('formCorreo').addEventListener('submit', (e) => {
    e.preventDefault();
    const form = e.target;
    const datos = {
      destino: form.destino.value,
      asunto: form.asunto.value,
      mensaje: form.mensaje.value,
    };

    console.log('📨 Correo enviado (simulado):', datos);
    alert('Correo enviado correctamente (simulado)');
    form.reset();
  });
};

export default renderCorreo;
