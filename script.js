document.addEventListener("DOMContentLoaded", function () {
  const ramos = document.querySelectorAll(".ramo");

  ramos.forEach(ramo => {
    // Inicializar estilos
    if (!ramo.classList.contains("bloqueado")) {
      ramo.classList.add("desbloqueado");
    }

    ramo.addEventListener("click", function () {
      if (ramo.classList.contains("bloqueado") || ramo.classList.contains("aprobado")) {
        return;
      }

      // Marcar como aprobado
      ramo.classList.remove("desbloqueado");
      ramo.classList.add("aprobado");

      // Desbloquear los ramos dependientes
      const desbloquea = ramo.getAttribute("data-desbloquea");
      if (desbloquea) {
        const ramosDesbloqueados = desbloquea.split(",");
        ramosDesbloqueados.forEach(nombre => {
          const siguiente = document.querySelector(`.ramo[data-nombre="${nombre.trim()}"]`);
          if (siguiente && siguiente.classList.contains("bloqueado")) {
            siguiente.classList.remove("bloqueado");
            siguiente.classList.add("desbloqueado");
          }
        });
      }
    });
  });
});
