const app = document.getElementById('app');

app.innerHTML = `
  <div class="min-h-screen flex items-center justify-center bg-blue-100">
    <div class="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6 text-blue-700 text-center">Registro</h2>
      <form id="formRegister" class="space-y-4">
        <input type="text" name="nombre" placeholder="Nombre completo" required class="w-full p-2 border border-gray-300 rounded" />
        <input type="email" name="correo" placeholder="Correo electrónico" required class="w-full p-2 border border-gray-300 rounded" />
        <input type="password" name="password" placeholder="Contraseña" required class="w-full p-2 border border-gray-300 rounded" />
        <select name="rol" class="w-full p-2 border border-gray-300 rounded" required>
          <option value="">Selecciona un rol</option>
          <option value="profesor">Profesor</option>
          <option value="administrador">Administrador</option>
        </select>
        <button type="submit" class="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Registrar</button>
        <button type="button" id="btnVolver" class="w-full bg-gray-300 text-black p-2 rounded hover:bg-gray-400">⬅ Volver</button>
      </form>
    </div>
  </div>
`;

document.getElementById('formRegister').addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = e.target;
  const usuario = {
    nombre: form.nombre.value.trim(),
    correo: form.correo.value.trim(),
    password: form.password.value.trim(),
    rol: form.rol.value
  };

  try {
    const res = await fetch('https://backend-nuevooooo-1.onrender.com/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(usuario)
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Error al registrar');

    alert('✅ Usuario registrado correctamente');
    location.href = 'login.html'; // O redirige al login si lo tienes
  } catch (err) {
    alert(err.message);
  }
});

document.getElementById('btnVolver').addEventListener('click', () => {
  location.href = 'login.html';
});
