document.addEventListener("DOMContentLoaded", () => {
  const ramos = document.querySelectorAll('.ramo');

  ramos.forEach(r => {
    const req = r.dataset.requiere;
    if (req && req !== "none" && req !== "ninguno") {
      r.classList.add('disabled');
    }
  });

  ramos.forEach(ramo => {
    ramo.addEventListener('click', () => {
      if (ramo.classList.contains('disabled') || ramo.classList.contains('aprobado')) return;

      ramo.classList.add('aprobado');
      const aprobadoId = ramo.id;

      ramos.forEach(dep => {
        const reqs = dep.dataset.requiere;
        if (!reqs || reqs === "none" || reqs === "ninguno") return;
        const list = reqs.split(',').map(x => x.trim());
        if (list.includes(aprobadoId)) {
          // Verifica si todos los prerequisitos ya fueron aprobados
          const todos = list.every(id => document.getElementById(id).classList.contains('aprobado'));
          if (todos) {
            dep.classList.remove('disabled');
            dep.classList.add('desbloqueado');
          }
        }
      });
    });
  });
});
