import { cerrarSesion } from '../utils/authGuard.js';
import cargarGestionProfesores from './profesores.js';

const app = document.getElementById('app');

const cargarAdminDashboard = () => {
    app.innerHTML = `
        <div class="p-6">
            <div class="flex justify-between items-center mb-4">
                <h1 class="text-xl font-bold">Panel del Administrador</h1>
                <button id="logoutBtn" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                    Cerrar sesión
                </button>
            </div>
            <div class="space-y-2">
                <button id="btnGestionProfesores" class="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                    Gestionar Profesores
                </button>
            </div>
        </div>
    `;

    document.getElementById('logoutBtn').addEventListener('click', cerrarSesion);
    document.getElementById('btnGestionProfesores').addEventListener('click', cargarGestionProfesores);
};

export default cargarAdminDashboard;
