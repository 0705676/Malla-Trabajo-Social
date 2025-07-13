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
      { nombre: "Estadística I", requiere: ["Matemáticas"], abre: ["Estadística II", "Estudios de Población"] },
      { nombre: "Epistemología de las ciencias sociales", abre: ["Investigación Social I"] },
      { nombre: "Trabajo social como disciplina y profesión", requiere: ["Fundamentos del trabajo social"], abre: ["Métodos de Intervención Profesional en el Trabajo Social"] },
      { nombre: "Antropología Social", requiere: ["Bases Sociológicas para el Trabajo Social"] },
      { nombre: "Psicología General", abre: ["Psicología Social"] },
      { nombre: "Informática Básica" }
    ]
  },
  {
    semestre: "III semestre",
    materias: [
      { nombre: "Estadística II", requiere: ["Estadística I"], abre: ["Investigación Social II"] },
      { nombre: "Investigación Social I", requiere: ["Epistemología de las ciencias sociales"], abre: ["Investigación Social II"] },
      { nombre: "Métodos de Intervención Profesional en el Trabajo Social", requiere: ["Trabajo social como disciplina y profesión"], abre: ["Trabajo Social con Grupo", "Planificación Social"] },
      { nombre: "Ecología Humana" },
      { nombre: "Psicología Social", requiere: ["Psicología General"] },
      { nombre: "Teoría Socio-política" }
    ]
  },
  {
    semestre: "IV semestre",
    materias: [
      { nombre: "Comunicación" },
      { nombre: "Estudios de Población", requiere: ["Estadística I"], abre: ["Indicadores Sociales"] },
      { nombre: "Trabajo Social con Grupo", requiere: ["Métodos de Intervención Profesional en el Trabajo Social"], abre: ["Trabajo Social en el ámbito comunitario"] },
      { nombre: "Técnicas Grupales" },
      { nombre: "Economía Política", abre: ["Estado y Política Social"] },
      { nombre: "Historia Contemporánea de Venezuela" }
    ]
  },
  {
    semestre: "V semestre",
    materias: [
      { nombre: "Investigación Social II", requiere: ["Estadística II", "Investigación Social I"], abre: ["Investigación Social III"] },
      { nombre: "Legislación Social" },
      { nombre: "Trabajo Social en el ámbito comunitario", requiere: ["Trabajo Social con Grupo"], abre: ["Prácticas de Trabajo Social I"] },
      { nombre: "Planificación Social", requiere: ["Métodos de Intervención Profesional en el Trabajo Social"], abre: ["Formulación y Evaluación de Proyectos Sociales", "Indicadores Sociales"] },
      { nombre: "Estado y Política Social", requiere: ["Economía Política"], abre: ["Administración y Gerencia Social", "Seguridad Social"] },
      { nombre: "Inglés" }
    ]
  },
  {
    semestre: "VI semestre",
    materias: [
      { nombre: "Investigación Social III", requiere: ["Investigación Social II"], abre: ["Computación Aplicada a las Ciencias Sociales"] },
      { nombre: "Administración y Gerencia Social", requiere: ["Estado y Política Social"], abre: ["Prácticas de Trabajo Social I"] },
      { nombre: "Trabajo Social con Individuo y Familia", abre: ["Orientación Familiar"] },
      { nombre: "Formulación y Evaluación de Proyectos Sociales" },
      { nombre: "Indicadores Sociales" },
      { nombre: "Electiva I" }
    ]
  },
  {
    semestre: "VII semestre",
    materias: [
      { nombre: "Prácticas de Trabajo Social I", requiere: ["Trabajo Social en el ámbito comunitario", "Administración y Gerencia Social"], abre: ["Prácticas de Trabajo Social II"] },
      { nombre: "Seguridad Social", requiere: ["Estado y Política Social"] },
      { nombre: "Electiva II" }
    ]
  },
  {
    semestre: "VIII semestre",
    materias: [
      { nombre: "Computación Aplicada a las Ciencias Sociales", requiere: ["Investigación Social III"] },
      { nombre: "Prácticas de Trabajo Social II", requiere: ["Prácticas de Trabajo Social I"], abre: ["Prácticas de Trabajo Social III"] },
      { nombre: "Orientación Familiar", requiere: ["Trabajo Social con Individuo y Familia"], abre: ["Prácticas de Trabajo Social III"] }
    ]
  },
  {
    semestre: "IX semestre",
    materias: [
      { nombre: "Prácticas de Trabajo Social III", requiere: ["Prácticas de Trabajo Social II", "Orientación Familiar"] }
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

let estadoMaterias = JSON.parse(localStorage.getItem("estadoMaterias")) || {};

function puedeDesbloquear(materia) {
  if (!materia.requiere) return true;
  return materia.requiere.every(req => estadoMaterias[req] === "aprobada");
}

function renderMalla() {
  const malla = document.getElementById("malla");
  malla.innerHTML = "";

  materiasPorSemestre.forEach(semestre => {
    const columna = document.createElement("div");
    columna.className = "semestre";

    const titulo = document.createElement("h2");
    titulo.textContent = semestre.semestre;
    columna.appendChild(titulo);

    semestre.materias.forEach(materia => {
      const div = document.createElement("div");
      div.className = "materia";
      div.textContent = materia.nombre;

      const estado = estadoMaterias[materia.nombre];

      if (estado === "aprobada") {
        div.classList.add("aprobada");
      } else if (puedeDesbloquear(materia)) {
        div.classList.add("desbloqueada");
        div.addEventListener("click", () => {
          estadoMaterias[materia.nombre] = "aprobada";
          localStorage.setItem("estadoMaterias", JSON.stringify(estadoMaterias));
          renderMalla();
        });
      } else {
        // sigue bloqueada (gris por defecto)
      }

      columna.appendChild(div);
    });

    malla.appendChild(columna);
  });
}

renderMalla();
