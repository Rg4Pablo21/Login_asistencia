import { apiFetch } from '../utils/api.js';
import cargarAdminDashboard from '../admin/dashboard.js';
import cargarProfesorDashboard from '../profesor/dashboard.js';

const app = document.getElementById('app');

const cargarLogin = () => {
  app.innerHTML = `
    <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#4EF5A7] to-[#4ED4F5]">
      <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">Iniciar Sesión</h2>
        <form id="loginForm" class="space-y-4">
          <input type="email" name="correo" placeholder="Correo electrónico" required class="w-full px-4 py-2 border rounded" />
          <input type="password" name="password" placeholder="Contraseña" required class="w-full px-4 py-2 border rounded" />
          <button type="submit" class="w-full bg-[#4EF5A7] hover:bg-[#79F55E] text-white py-2 rounded">Entrar</button>
        </form>
        <div class="mt-4 text-center">
          <a href="#" id="linkRecuperar" class="text-sm text-blue-600 hover:underline">¿Olvidaste tu contraseña?</a>
        </div>
      </div>
    </div>
  `;

  const form = document.getElementById('loginForm');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await apiFetch('https://backend-nuevooooo-1.onrender.com/auth/login', 'POST', data);

      if (res.token && res.rol) {
        localStorage.setItem('token', res.token);
        localStorage.setItem('rol', res.rol);

        // Redirige según el rol
        if (res.rol === 'administrador') {
          cargarAdminDashboard();
        } else if (res.rol === 'profesor') {
          cargarProfesorDashboard();
        } else {
          alert('Rol no reconocido');
        }
      } else {
        alert(res.message || 'Error en el inicio de sesión');
      }
    } catch (err) {
      console.error(err);
      alert('❌ Error de conexión o credenciales inválidas');
    }
  });

  document.getElementById('linkRecuperar').addEventListener('click', () => {
    import('./forgot.js').then(mod => mod.default());
  });
};

export default cargarLogin;
