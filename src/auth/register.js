import { apiFetch } from '../utils/api.js';

const app = document.getElementById('app');

const renderRegistro = () => {
    app.innerHTML = `
        <form id="registroForm">
            <h1 class="text-3xl text-center mb-4">Crear Cuenta</h1>
            <input type="text" name="nombre" placeholder="Nombre completo" required>
            <input type="email" name="correo" placeholder="Correo electrónico" required>
            <input type="password" name="password" placeholder="Contraseña" required>
            <button type="submit">Registrarse</button>
            <a href="#" id="linkLogin">¿Ya tienes cuenta? Iniciar sesión</a>
        </form>
    `;

    document.getElementById('registroForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const form = e.target;
        const data = {
            nombre: form.nombre.value,
            correo: form.correo.value,
            password: form.password.value,
            rol: 'profesor'
        };

        const res = await apiFetch('/auth/register', 'POST', data);
        alert(res.message || 'Registro completado');
        import('./login.js').then(mod => mod.default());
    });

    document.getElementById('linkLogin').addEventListener('click', () => {
        import('./login.js').then(mod => mod.default());
    });
};

export default renderRegistro;
