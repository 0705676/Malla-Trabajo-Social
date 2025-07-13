document.addEventListener("DOMContentLoaded", function () {
  const ramos = document.querySelectorAll(".ramo");

  // Cargar lista de ramos aprobados desde localStorage
  const ramosAprobados = JSON.parse(localStorage.getItem("ramosAprobados") || "[]");

  // Función para desbloquear dependientes
  function desbloquearDependientes(nombreRamo) {
    const ramoActual = document.querySelector(`.ramo[data-nombre="${nombreRamo}"]`);
    const desbloquea = ramoActual?.getAttribute("data-desbloquea");
    if (desbloquea) {
      desbloquea.split(",").forEach(nombre => {
        const ramoDestino = document.querySelector(`.ramo[data-nombre="${nombre.trim()}"]`);
        if (ramoDestino && ramoDestino.classList.contains("bloqueado")) {
          ramoDestino.classList.remove("bloqueado");
          ramoDestino.classList.add("desbloqueado");
        }
      });
    }
  }

  // Inicializar botones según estado guardado
  ramos.forEach(ramo => {
    const nombre = ramo.getAttribute("data-nombre");

    if (ramosAprobados.includes(nombre)) {
      ramo.classList.remove("bloqueado", "desbloqueado");
      ramo.classList.add("aprobado");
    } else if (!ramo.classList.contains("bloqueado")) {
      ramo.classList.add("desbloqueado");
    }
  });

  // Segundo paso: desbloquear los dependientes de lo ya aprobado
  ramosAprobados.forEach(nombre => {
    desbloquearDependientes(nombre);
  });

  // Escuchar clics
  ramos.forEach(ramo => {
    ramo.addEventListener("click", function () {
      const nombre = ramo.getAttribute("data-nombre");

      if (ramo.classList.contains("bloqueado") || ramo.classList.contains("aprobado")) return;

      ramo.classList.remove("desbloqueado");
      ramo.classList.add("aprobado");

      // Guardar en localStorage
      if (!ramosAprobados.includes(nombre)) {
        ramosAprobados.push(nombre);
        localStorage.setItem("ramosAprobados", JSON.stringify(ramosAprobados));
      }

      desbloquearDependientes(nombre);
    });
  });
});
