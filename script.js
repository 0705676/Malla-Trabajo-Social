document.addEventListener("DOMContentLoaded", () => {
  const ramos = document.querySelectorAll('.ramo');

  // 1. Al iniciar, los que tienen prerequisitos se deshabilitan
  ramos.forEach(r => {
    const req = r.dataset.requiere;
    if (req && req !== "none" && req !== "ninguno") {
      r.classList.add('disabled');
    }
  });

  // 2. Cuando apruebas un ramo
  ramos.forEach(ramo => {
    ramo.addEventListener('click', () => {
      if (ramo.classList.contains('disabled') || ramo.classList.contains('aprobado')) return;

      // Marcar como aprobado (rojo)
      ramo.classList.add('aprobado');

      const aprobadoId = ramo.id;

      // Revisar qué ramos desbloquear
      ramos.forEach(dep => {
        const reqs = dep.dataset.requiere;
        if (!reqs || reqs === "none" || reqs === "ninguno") return;

        const list = reqs.split(',').map(x => x.trim());
        const todos = list.every(id => {
          const prereq = document.getElementById(id);
          return prereq && prereq.classList.contains('aprobado');
        });

        if (todos) {
          dep.classList.remove('disabled'); // pasa a blanco
        }
      });
    });
  });
});
