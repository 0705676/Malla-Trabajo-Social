document.addEventListener("DOMContentLoaded", function () {
  const ramos = document.querySelectorAll(".ramo");

  // Cargar estado guardado
  ramos.forEach(ramo => {
    const estado = localStorage.getItem(ramo.id);
    if (estado === "aprobado") {
      aprobarRamo(ramo);
    }
  });

  ramos.forEach(ramo => {
    if (!ramo.dataset.prereqs) {
      desbloquearRamo(ramo);
    } else {
      bloquearRamo(ramo);
    }

    ramo.addEventListener("click", function () {
      if (ramo.classList.contains("desbloqueado")) {
        aprobarRamo(ramo);
        localStorage.setItem(ramo.id, "aprobado");

        // Desbloquear los ramos que dependen de este
        ramos.forEach(r => {
          const prereqs = r.dataset.prereqs?.split(",") || [];
          if (prereqs.every(p => localStorage.getItem(p) === "aprobado")) {
            desbloquearRamo(r);
          }
        });
      }
    });
  });

  function aprobarRamo(ramo) {
    ramo.classList.remove("desbloqueado");
    ramo.classList.add("aprobado");
    ramo.disabled = true;
  }

  function desbloquearRamo(ramo) {
    if (!ramo.classList.contains("aprobado")) {
      ramo.classList.remove("bloqueado");
      ramo.classList.add("desbloqueado");
      ramo.disabled = false;
    }
  }

  function bloquearRamo(ramo) {
    if (!ramo.classList.contains("aprobado")) {
      ramo.classList.add("bloqueado");
      ramo.disabled = true;
    }
  }
});
