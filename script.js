const materiasPorSemestre = [
  {
    semestre: "I semestre",
    materias: [
      { nombre: "Matemáticas", abre: ["Estadística I"] },
      { nombre: "Bases Sociológicas para el Trabajo Social", abre: ["Antropología Social"] },
      { nombre: "Fundamentos del trabajo social", abre: ["Trabajo social como disciplina y profesión"] },
      { nombre: "Expresión Oral y escrita" },
      { nombre: "Autodesarrollo" }
    ]
  },
  {
    semestre: "II semestre",
    materias: [
      { nombre: "Estadística I", abre: ["Estadística II", "Estudios de Población"] },
      { nombre: "Epistemología de las ciencias sociales", abre: ["Investigación Social I"] },
      { nombre: "Trabajo social como disciplina y profesión", abre: ["Métodos de Intervención Profesional en el Trabajo Social"] },
      { nombre: "Antropología Social" },
      { nombre: "Psicología General", abre: ["Psicología Social"] },
      { nombre: "Informática Básica" }
    ]
  },
  {
    semestre: "III semestre",
    materias: [
      { nombre: "Estadística II", abre: ["Investigación Social II"] },
      { nombre: "Investigación Social I", abre: ["Investigación Social II"] },
      { nombre: "Métodos de Intervención Profesional en el Trabajo Social", abre: ["Trabajo Social con Grupo", "Planificación Social"] },
      { nombre: "Ecología Humana" },
      { nombre: "Psicología Social" },
      { nombre: "Teoría Socio-política" }
    ]
  },
  {
    semestre: "IV semestre",
    materias: [
      { nombre: "Comunicación" },
      { nombre: "Estudios de Población", abre: ["Indicadores Sociales"] },
      { nombre: "Trabajo Social con Grupo", abre: ["Trabajo Social en el ámbito comunitario"] },
      { nombre: "Técnicas Grupales" },
      { nombre: "Economía Política", abre: ["Estado y Política Social"] },
      { nombre: "Historia Contemporánea de Venezuela" }
    ]
  },
  {
    semestre: "V semestre",
    materias: [
      { nombre: "Investigación Social II", abre: ["Investigación Social III"] },
      { nombre: "Legislación Social" },
      { nombre: "Trabajo Social en el ámbito comunitario", abre: ["Prácticas de Trabajo Social I"] },
      { nombre: "Planificación Social", abre: ["Formulación y Evaluación de Proyectos Sociales", "Indicadores Sociales"] },
      { nombre: "Estado y Política Social", abre: ["Administración y Gerencia Social", "Seguridad Social"] },
      { nombre: "Inglés" }
    ]
  },
  {
    semestre: "VI semestre",
    materias: [
      { nombre: "Investigación Social III", abre: ["Computación Aplicada a las Ciencias Sociales"] },
      { nombre: "Administración y Gerencia Social", abre: ["Prácticas de Trabajo Social I"] },
      { nombre: "Trabajo Social con Individuo y Familia", abre: ["Orientación Familiar"] },
      { nombre: "Formulación y Evaluación de Proyectos Sociales" },
      { nombre: "Indicadores Sociales" },
      { nombre: "Electiva I" }
    ]
  },
  {
    semestre: "VII semestre",
    materias: [
      { nombre: "Prácticas de Trabajo Social I", abre: ["Prácticas de Trabajo Social II"] },
      { nombre: "Seguridad Social" },
      { nombre: "Electiva II" }
    ]
  },
  {
    semestre: "VIII semestre",
    materias: [
      { nombre: "Computación Aplicada a las Ciencias Sociales" },
      { nombre: "Prácticas de Trabajo Social II", abre: ["Prácticas de Trabajo Social III"] },
      { nombre: "Orientación Familiar", abre: ["Prácticas de Trabajo Social III"] }
    ]
  },
  {
    semestre: "IX semestre",
    materias: [
      { nombre: "Prácticas de Trabajo Social III" }
    ]
  },
  {
    semestre: "X semestre",
    materias: [
      { nombre: "Trabajo de Grado" },
      { nombre: "Seminario Servicio Comunitario" }
    ]
  }
];

const estadoMaterias = JSON.parse(localStorage.getItem("estadoMaterias")) || {};

function renderMalla() {
  const malla = document.getElementById("malla");
  malla.innerHTML = "";

  materiasPorSemestre.forEach((semestre, index) => {
    const columna = document.createElement("div");
    columna.className = "semestre";
    const titulo = document.createElement("h2");
    titulo.textContent = semestre.semestre;
    columna.appendChild(titulo);

    semestre.materias.forEach((materia) => {
      const div = document.createElement("div");
      div.textContent = materia.nombre;
      div.className = "materia";

      if (estadoMaterias[materia.nombre] === "aprobada") {
        div.classList.add("aprobada");
      } else if (
        !materia.requiere ||
        (materia.requiere || []).every(r => estadoMaterias[r] === "aprobada")
      ) {
        div.classList.add("desbloqueada");
      }

      div.addEventListener("click", () => {
        const estado = estadoMaterias[materia.nombre];
        if (estado !== "aprobada" && div.classList.contains("desbloqueada")) {
          estadoMaterias[materia.nombre] = "aprobada";
          if (materia.abre) {
            materia.abre.forEach(abierta => {
              // Las materias desbloqueadas por esta, si no tienen requisitos adicionales, se desbloquean automáticamente
              if (!estadoMaterias[abierta]) {
                estadoMaterias[abierta] = "desbloqueada";
              }
            });
          }
          localStorage.setItem("estadoMaterias", JSON.stringify(estadoMaterias));
          renderMalla();
        }
      });

      columna.appendChild(div);
    });

    malla.appendChild(columna);
  });
}
renderMalla();
