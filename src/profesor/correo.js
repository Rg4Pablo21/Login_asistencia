const app = document.getElementById('app');

const cargarCorreo = () => {
    app.innerHTML = `
        <h2 class="text-xl mb-4">Enviar Correo</h2>
        <form id="correoForm">
            <input type="email" name="correo" placeholder="Correo del alumno" required>
            <textarea name="mensaje" placeholder="Escribe tu mensaje..." rows="4"></textarea><br>
            <button type="submit">Enviar</button>
        </form>
    `;

    document.getElementById('correoForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        const data = Object.fromEntries(form.entries());
        console.log('📧 Enviando correo:', data);
        alert('✅ Correo enviado correctamente (simulado)');
    });
};

export default cargarCorreo;
