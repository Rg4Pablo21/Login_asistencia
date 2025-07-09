import { apiFetch } from '../utils/api.js';
import { guardarToken } from '../utils/authGuard.js';
import cargarDashboard from '../profesor/dashboard.js';
import cargarAdminDashboard from '../admin/dashboard.js';

const app = document.getElementById('app');

const renderLogin = () => {
    app.innerHTML = `
        <form id="loginForm">
            <h1 class="text-3xl text-center mb-4">Iniciar Sesión</h1>
            <input type="email" name="correo" placeholder="Correo electrónico" required>
            <input type="password" name="password" placeholder="Contraseña" required>
            <button type="submit">Ingresar</button>
            <a href="#" id="linkRegistro">¿No tienes cuenta? Registrarse</a>
            <a href="#" id="linkOlvido">¿Olvidaste tu contraseña?</a>
        </form>
    `;

    document.getElementById('loginForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const correo = e.target.correo.value;
        const password = e.target.password.value;
        const res = await apiFetch('/auth/login', 'POST', { correo, password });

        if (res.token) {
            guardarToken(res.token, res.rol);
            res.rol === 'profesor' ? cargarDashboard() : cargarAdminDashboard();
        } else {
            alert(res.message || 'Error al iniciar sesión');
        }
    });

    document.getElementById('linkRegistro').addEventListener('click', renderRegistro);
    document.getElementById('linkOlvido').addEventListener('click', renderOlvido);
};

const renderRegistro = () => {
    import('./registro.js').then(mod => mod.default());
};

const renderOlvido = () => {
    import('./forgot.js').then(mod => mod.default());
};

renderLogin();
