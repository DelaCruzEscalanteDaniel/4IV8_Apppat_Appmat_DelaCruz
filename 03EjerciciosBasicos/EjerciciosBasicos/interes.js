function validarn(e){
    var teclado = (document.all)?e.keyCode:e.which;
    if(teclado == 8) return true;

    var patron = /[0-9\d .]/;
    var codigo = String.fromCharCode(teclado);
    return patron.test(codigo);
}

function interes(){
    var valor = document.getElementById('cantidad1').value;
    var interes = parseFloat(valor);
    var subtotal = interes * .10;
    var total = subtotal + interes;
    document.getElementById('sueldo1').value = "$ " + total;
}

function borrar(){
    document.getElementById('sueldo1').value="";
    document.getElementById('cantidad1').value="";
    
}