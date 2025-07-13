document.addEventListener('DOMContentLoaded', () => {
    const courses = document.querySelectorAll('.course');

    // Función para verificar y actualizar el estado de los cursos
    const updateCourseStates = () => {
        courses.forEach(course => {
            const prereqIds = course.dataset.prereq ? course.dataset.prereq.split(',') : [];
            const allPrereqsMet = prereqIds.every(id => {
                const prereqCourse = document.getElementById(id.trim());
                return prereqCourse && prereqCourse.classList.contains('passed');
            });

            // Si es un curso bloqueado y sus prerrequisitos se cumplen, desbloquéalo
            if (course.classList.contains('locked') && allPrereqsMet) {
                course.classList.remove('locked');
            } else if (!course.classList.contains('passed') && !allPrereqsMet) {
                // Si el curso no ha sido aprobado y no tiene todos los prerrequisitos, bloquéalo
                course.classList.add('locked');
            }
        });
    };

    // Cargar el estado guardado de los cursos
    const savedPassedCourses = JSON.parse(localStorage.getItem('passedCourses')) || [];
    savedPassedCourses.forEach(id => {
        const course = document.getElementById(id);
        if (course) {
            course.classList.add('passed');
            course.classList.remove('locked'); // Asegurarse de que no esté bloqueado si ya está aprobado
        }
    });

    // Actualizar el estado inicial de los cursos al cargar la página
    updateCourseStates();

    courses.forEach(course => {
        course.addEventListener('click', () => {
            if (!course.classList.contains('locked') && !course.classList.contains('passed')) {
                course.classList.add('passed');

                // Guardar el estado en localStorage
                const currentPassedCourses = Array.from(document.querySelectorAll('.course.passed')).map(c => c.id);
                localStorage.setItem('passedCourses', JSON.stringify(currentPassedCourses));

                const unlockIds = course.dataset.unlock ? course.dataset.unlock.split(',') : [];
                unlockIds.forEach(id => {
                    const unlockedCourse = document.getElementById(id.trim());
                    if (unlockedCourse && unlockedCourse.classList.contains('locked')) {
                        // Solo quitar 'locked' si no está 'passed' y los prerrequisitos se cumplen
                        // La función updateCourseStates se encargará de esto
                    }
                });
                updateCourseStates(); // Volver a verificar todos los cursos después de un cambio
            }
        });
    });

    // Esto es para que al refrescar la página, los estados se mantengan
    window.addEventListener('load', updateCourseStates);
});
