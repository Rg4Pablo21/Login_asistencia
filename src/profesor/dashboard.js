import cargarAsistencia from './asistencia.js';
import cargarCorreo from './correo.js';
import cargarReportes from './reportes.js';
import { cerrarSesion } from '../utils/authGuard.js';

const app = document.getElementById('app');

const cargarDashboard = () => {
  app.innerHTML = `
    <div class="min-h-screen bg-gray-50">
      <nav class="bg-blue-600 text-white p-4 flex justify-between items-center">
        <h1 class="text-xl font-bold">Panel del Profesor</h1>
        <button id="btnCerrarSesion" class="bg-red-500 px-3 py-1 rounded hover:bg-red-600">Cerrar sesión</button>
      </nav>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
        <button class="btn-dashboard" id="btnAsistencia">📋 Tomar Asistencia</button>
        <button class="btn-dashboard" id="btnCorreo">✉️ Enviar Correo</button>
        <button class="btn-dashboard" id="btnReportes">📊 Ver Reportes</button>
      </div>
    </div>
  `;

  document.getElementById('btnCerrarSesion').addEventListener('click', () => {
    cerrarSesion();
    location.reload();
  });

  document.getElementById('btnAsistencia').addEventListener('click', cargarAsistencia);
  document.getElementById('btnCorreo').addEventListener('click', cargarCorreo);
  document.getElementById('btnReportes').addEventListener('click', cargarReportes);
};

// 💡 Exportamos como default para usarlo desde login.js después de autenticarse
export default cargarDashboard;
