import renderLogin from './src/auth/login.js';
import renderDashboardAdmin from './src/admin/dashboard.js';
import renderDashboardProfesor from './src/profesor/dashboard.js';

const token = localStorage.getItem('token');
const rol = localStorage.getItem('rol');

if (!token) {
  renderLogin(); // No hay token, mostrar login
} else {
  if (rol === 'admin') {
    renderDashboardAdmin();
  } else if (rol === 'profesor') {
    renderDashboardProfesor();
  } else {
    localStorage.clear();
    renderLogin(); // Rol inválido
  }
}
