document.addEventListener("DOMContentLoaded", () => {
  const ramos = document.querySelectorAll('.ramo');

  // Recuperar ramos aprobados desde localStorage
  const aprobadosGuardados = JSON.parse(localStorage.getItem('ramosAprobados')) || [];

  // Marcar como aprobados los guardados
  aprobadosGuardados.forEach(id => {
    const ramo = document.getElementById(id);
    if (ramo) {
      ramo.classList.add('aprobado');
    }
  });

  // Verificar qué ramos deben desbloquearse en base a los aprobados
  function actualizarDesbloqueados() {
    ramos.forEach(ramo => {
      const requisitos = ramo.dataset.requiere;
      if (!requisitos || requisitos === "none" || requisitos === "ninguno") {
        if (!ramo.classList.contains('aprobado')) {
          ramo.classList.remove('disabled');
        }
        return;
      }

      const ids = requisitos.split(',').map(r => r.trim());
      const todosAprobados = ids.every(id => {
        const req = document.getElementById(id);
        return req && req.classList.contains('aprobado');
      });

      if (todosAprobados && !ramo.classList.contains('aprobado')) {
        ramo.classList.remove('disabled');
      }
    });
  }

  // Aplicar desbloqueos en base al estado guardado
  actualizarDesbloqueados();

  // Clic en un ramo para aprobarlo
  ramos.forEach(ramo => {
    ramo.addEventListener('click', () => {
      if (ramo.classList.contains('disabled') || ramo.classList.contains('aprobado')) return;

      ramo.classList.add('aprobado');

      // Guardar en localStorage
      const id = ramo.id;
      if (!aprobadosGuardados.includes(id)) {
        aprobadosGuardados.push(id);
        localStorage.setItem('ramosAprobados', JSON.stringify(aprobadosGuardados));
      }

      // Desbloquear siguientes ramos si corresponde
      actualizarDesbloqueados();
    });
  });
});
