// Obtener todos los elementos con clase "ramo"
const ramos = document.querySelectorAll('.ramo');

// Función para manejar el clic en un ramo
ramos.forEach(ramo => {
    ramo.addEventListener('click', function() {
        if (ramo.classList.contains('aprobado')) {
            return; // Si el ramo ya está aprobado, no hacer nada
        }
        
        // Marcar el ramo como aprobado
        ramo.classList.add('aprobado');
        
        // Obtener los ramos que dependen de este ramo
        desbloquearRamos(ramo.id);
    });
});

// Función para desbloquear los ramos que dependen de otro
function desbloquearRamos(ramoId) {
    const ramosDependientes = document.querySelectorAll(`[data-requiere="${ramoId}"]`);
    
    ramosDependientes.forEach(ramo => {
        // Desbloquear el ramo
        ramo.classList.remove('disabled');
        ramo.classList.add('desbloqueado');
    });
}
