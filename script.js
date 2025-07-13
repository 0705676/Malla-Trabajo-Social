document.addEventListener("DOMContentLoaded", function () {
  const ramos = document.querySelectorAll(".ramo");

  ramos.forEach(boton => {
    // Inicializa estado
    if (!boton.classList.contains("bloqueado")) {
      boton.classList.add("desbloqueado");
    }

    boton.addEventListener("click", function () {
      // Solo permite clic si está desbloqueado
      if (boton.classList.contains("bloqueado") || boton.classList.contains("aprobado")) return;

      boton.classList.remove("desbloqueado");
      boton.classList.add("aprobado");

      const desbloquea = boton.getAttribute("data-desbloquea");
      if (desbloquea) {
        const ramosADesbloquear = desbloquea.split(",");
        ramosADesbloquear.forEach(nombre => {
          const ramoDestino = document.querySelector(`.ramo[data-nombre="${nombre.trim()}"]`);
          if (ramoDestino && ramoDestino.classList.contains("bloqueado")) {
            ramoDestino.classList.remove("bloqueado");
            ramoDestino.classList.add("desbloqueado");
          }
        });
      }
    });
  });
});
