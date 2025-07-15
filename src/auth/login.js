import { apiFetch } from '../utils/api.js';
import { parseJWT } from '../utils/helpers.js';
import cargarAdminDashboard from '../pages/admin/dashboard.js';
import cargarProfesorDashboard from '../pages/profesor/dashboard.js';
import { APIURLS } from '../utils/environments.js';

const app = document.getElementById('app');

const cargarLogin = () => {
  app.innerHTML = `
    <main class="form-signin w-100 m-auto pt-5">
      <div class="bg-white p-5 rounded shadow m-auto mt-5" style="max-width:375px;">
        <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">Iniciar Sesión</h2>
        <form id="loginForm" class="space-y-4 ">
          <div class="form-floating mb-3">
            <input type="email" name="username" placeholder="Correo electrónico" required class="form-control w-full px-4 py-2 border rounded" />
            <label for="floatingInput">Email address</label>
          </div>
          <div class="form-floating mb-3">
            <input type="password" name="password" placeholder="Contraseña" required class="form-control w-full px-4 py-2 border rounded" />            
            <label for="floatingInput">Contraseña</label>
          </div>
          
          <button type="submit" class="btn btn-primary w-100 py-2">Entrar</button>
        </form>
        <div class="mt-4 text-center">
          <a href="#" id="linkRecuperar" class="text-sm text-blue-600 hover:underline">¿Olvidaste tu contraseña?</a>
        </div>
      </div>
    </main>
  `;

  const form = document.getElementById('loginForm');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      //const res = await apiFetch('https://backend-nuevooooo-1.onrender.com/auth/login', 'POST', data);
      const res = await apiFetch(APIURLS.auth.login, 'POST', data);

      console.log(res);

      if (res.token) {
        const parsedToken = parseJWT(res.token);

        localStorage.setItem('token', res.token);        
        localStorage.setItem('rol', parsedToken.rol);

        cargarAdminDashboard();
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
