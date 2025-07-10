const app = document.getElementById('app');

const cargarAdminDashboard = () => {
  app.innerHTML = `
    <section class="admin-dashboard">
      <h1>Panel del Administrador</h1>

      <div class="dashboard-buttons">
        <button id="btnNiveles" class="admin-btn">📚 Gestionar Niveles y Grados</button>
        <button id="btnProfesores" class="admin-btn">👨‍🏫 Gestionar Profesores</button>
        <button id="btnSalir" class="admin-btn salir">🔙 Cerrar sesión</button>
      </div>
    </section>
  `;

  document.getElementById('btnNiveles').addEventListener('click', () => {
    import('./niveles.js').then(mod => mod.default());
  });

  document.getElementById('btnProfesores').addEventListener('click', () => {
    import('./profesores.js').then(mod => mod.default());
  });

  // 🔧 CORREGIDO: se agregó 'click' como primer argumento
  document.getElementById('btnSalir').addEventListener('click', () => {
    localStorage.clear();
    location.reload();
  });
};

export default cargarAdminDashboard;
