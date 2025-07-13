document.addEventListener("DOMContentLoaded", function () {
  const ramos = document.querySelectorAll(".ramo");

  // Cargar progreso desde localStorage
  const aprobadosGuardados = JSON.parse(localStorage.getItem("ramosAprobados") || "[]");

  // Inicializar botones
  ramos.forEach(ramo => {
    const nombre = ramo.getAttribute("data-nombre");

    if (aprobadosGuardados.includes(nombre)) {
      ramo.classList.remove("bloqueado", "desbloqueado");
      ramo.classList.add("aprobado");
      desbloquearDependientes(ramo);
    } else if (!ramo.classList.contains("bloqueado")) {
      ramo.classList.add("desbloqueado");
    }

    // Clic para aprobar
    ramo.addEventListener("click", function () {
      if (ramo.classList.contains("bloqueado") || ramo.classList.contains("aprobado")) return;

      ramo.classList.remove("desbloqueado");
      ramo.classList.add("aprobado");

      aprobadosGuardados.push(nombre);
      localStorage.setItem("ramosAprobados", JSON.stringify(aprobadosGuardados));

      desbloquearDependientes(ramo);
    });
  });

  function desbloquearDependientes(ramo) {
    const desbloquea = ramo.getAttribute("data-desbloquea");
    if (!desbloquea) return;

    desbloquea.split(",").forEach(nombre => {
      const siguiente = document.querySelector(`.ramo[data-nombre="${nombre.trim()}"]`);
      if (siguiente && siguiente.classList.contains("bloqueado")) {
        siguiente.classList.remove("bloqueado");
        siguiente.classList.add("desbloqueado");
      }
    });
  }
});
