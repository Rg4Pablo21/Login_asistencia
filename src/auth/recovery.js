// src/auth/recovery.js
import renderLogin from './login.js';

const app = document.getElementById('app');

const renderRecovery = () => {
  app.innerHTML = `
    <div class="login-galaxy">
      <div class="login-card">
        <h2 class="login-title">Restablecer contraseña</h2>
        <form id="recoveryForm">
          <input type="password" name="nuevaPassword" placeholder="Nueva contraseña" required />
          <input type="password" name="confirmarPassword" placeholder="Confirmar contraseña" required />
          <button type="submit">Actualizar</button>
        </form>
        <div class="login-links">
          <a href="#" id="volverLogin">Volver al login</a>
        </div>
      </div>
    </div>
  `;

  document.getElementById('recoveryForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const nueva = e.target.nuevaPassword.value.trim();
    const confirmar = e.target.confirmarPassword.value.trim();

    if (!nueva || !confirmar) return alert('Completa todos los campos');
    if (nueva !== confirmar) return alert('Las contraseñas no coinciden');

    // Aquí debes hacer la petición a tu endpoint real cuando lo tengas
    alert('✅ Contraseña actualizada (simulado)');
    renderLogin();
  });

  document.getElementById('volverLogin').addEventListener('click', (e) => {
    e.preventDefault();
    renderLogin();
  });
};

export default renderRecovery;
