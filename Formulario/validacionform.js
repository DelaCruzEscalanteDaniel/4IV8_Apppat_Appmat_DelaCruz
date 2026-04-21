function validar(formulario) {

    if (formulario.nombre.value == "" || formulario.nombre.value.length < 3) {
        alert("El nombre es obligatorio y debe tener al menos 3 caracteres.");
        formulario.nombre.focus();
        return false;
    }

    var regexNombre = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/;
    if (!regexNombre.test(formulario.nombre.value)) {
        alert("El nombre solo puede contener letras y espacios.");
        formulario.nombre.focus();
        return false;
    }

    if (formulario.edad.value == "") {
        alert("La edad es obligatoria.");
        formulario.edad.focus();
        return false;
    }

    var edad = parseInt(formulario.edad.value);
    if (isNaN(edad) || edad < 1 || edad > 120) {
        alert("Por favor ingresa una edad válida (entre 1 y 120 años).");
        formulario.edad.focus();
        return false;
    }

    if (formulario.email.value == "") {
        alert("El correo electrónico es obligatorio.");
        formulario.email.focus();
        return false;
    }

    var regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(formulario.email.value)) {
        alert("Por favor ingresa un correo electrónico válido.");
        formulario.email.focus();
        return false;
    }

    alert("¡Formulario validado correctamente! Enviando datos...");
    return true;
}