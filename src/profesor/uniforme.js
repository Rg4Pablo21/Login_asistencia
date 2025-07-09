const app = document.getElementById('app');

const cargarUniforme = () => {
    app.innerHTML = `
        <h2 class="text-xl mb-4">Revisión de Uniforme</h2>
        <form id="uniformeForm">
            <input type="text" name="nombre" placeholder="Nombre del Alumno" required>
            <label><input type="checkbox" name="playera"> Playera</label><br>
            <label><input type="checkbox" name="pantalon"> Pantalón</label><br>
            <label><input type="checkbox" name="zapatos"> Zapatos</label><br>
            <label><input type="checkbox" name="sueter"> Suéter</label><br>
            <label><input type="checkbox" name="corte_pelo"> Corte de Pelo</label><br>
            <textarea name="observaciones" placeholder="Observaciones..." rows="3"></textarea><br>
            <button type="submit">Guardar</button>
        </form>
    `;

    document.getElementById('uniformeForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        const data = Object.fromEntries(form.entries());
        console.log('🚨 Uniforme registrado:', data);
        alert('✅ Revisión de uniforme guardada (simulada)');
    });
};

export default cargarUniforme;
