// src/auth/forgot.js
import { apiFetch } from '../utils/api.js';
import renderLogin from './login.js';

const app = document.getElementById('app');

const renderOlvido = () => {
  app.innerHTML = `
    <div class="login-galaxy">
      <div class="login-card">
        <h2 class="login-title">Recuperar contraseña</h2>
        <form id="olvidoForm">
          <input type="email" name="correo" placeholder="Correo electrónico" required />
          <button type="submit">Enviar enlace</button>
        </form>
        <div class="login-links">
          <a href="#" id="volverLogin">Volver al login</a>
        </div>
      </div>
    </div>
  `;

  const form = document.getElementById('olvidoForm');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const correo = form.correo.value.trim();

    if (!correo) return alert('Debes ingresar un correo');

    const res = await apiFetch('https://backend-nuevooooo-1.onrender.com/auth/forgot-password', 'POST', { correo });

    alert(res.message || 'Se ha enviado el correo');
    renderLogin(); // volver al login automáticamente
  });

  document.getElementById('volverLogin').addEventListener('click', (e) => {
    e.preventDefault();
    renderLogin();
  });
};

export default renderOlvido;
