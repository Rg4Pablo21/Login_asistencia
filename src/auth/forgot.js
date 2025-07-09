import { apiFetch } from '../utils/api.js';

const app = document.getElementById('app');

const renderOlvido = () => {
    app.innerHTML = `
        <form id="olvidoForm">
            <h1 class="text-3xl text-center mb-4">Recuperar Contraseña</h1>
            <input type="email" name="correo" placeholder="Correo electrónico" required>
            <button type="submit">Enviar enlace</button>
            <a href="#" id="linkLogin">Volver al login</a>
        </form>
    `;

    document.getElementById('olvidoForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const correo = e.target.correo.value;
        const res = await apiFetch('/auth/forgot-password', 'POST', { correo });
        alert(res.message || 'Correo enviado');
        import('./login.js').then(mod => mod.default());
    });

    document.getElementById('linkLogin').addEventListener('click', () => {
        import('./login.js').then(mod => mod.default());
    });
};

export default renderOlvido;
