document.addEventListener("DOMContentLoaded", () => {
    const ramos = document.querySelectorAll('.ramo');

    // Inicializar: bloquear todos los ramos con requisitos
    ramos.forEach(ramo => {
        const requisito = ramo.getAttribute('data-requiere');
        if (requisito && requisito !== "none" && requisito !== "ninguno") {
            ramo.classList.add('disabled');
        }
    });

    ramos.forEach(ramo => {
        ramo.addEventListener('click', () => {
            // Evitar clic en ramos bloqueados
            if (ramo.classList.contains('disabled') || ramo.classList.contains('aprobado')) {
                return;
            }

            // Marcar como aprobado
            ramo.classList.add('aprobado');
            ramo.classList.remove('desbloqueado');

            const aprobadoId = ramo.id;

            // Desbloquear los ramos que dependen de este
            ramos.forEach(dep => {
                const requisito = dep.getAttribute('data-requiere');
                if (requisito === aprobadoId) {
                    dep.classList.remove('disabled');
                    dep.classList.add('desbloqueado');
                }
            });
        });
    });
});
