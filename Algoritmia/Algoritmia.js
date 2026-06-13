function problema1(){
    const input = document.getElementById('p1-input');
    const output = document.getElementById('p1-output');

    const frase = input.value.trim();

    if (frase === "") {
        output.textContent = "Por favor, ingresa al menos una palabra.";
        return;
    }

    const resultado = frase.split(' ').reverse().join(' ');

    output.textContent = resultado;
}

function problema2(){
var p2_x1 = document.querySelector("#p2_x1").value; //error aqui
    var p2_x2 = document.querySelector('#p2_x2').value;
    var p2_x3 = document.querySelector('#p2_x3').value;
    var p2_x4 = document.querySelector('#p2_x4').value;
    var p2_x5 = document.querySelector('#p2_x5').value;

    var p2_x1 = document.querySelector('#p2_x1').value;
    var p2_x2 = document.querySelector('#p2_x2').value;
    var p2_x3 = document.querySelector('#p2_x3').value;
    var p2_x4 = document.querySelector('#p2_x4').value;
    var p2_x5 = document.querySelector('#p2_x5').value;

    //creamos los vectores
    var v1 = [p2_x1,p2_x2,p2_x3,p2_x4,p2_x5];
    var v2 = [p2_x1,p2_x2,p2_x3,p2_x4,p2_x5];

    //primero vamos aordenar los elementos para permurtarlos
    v1 =v1.sort(function(a,b) {return b-a});
    v2 =v2.sort(function(a,b) {return b-a});

    //para hacer la permutacion
    v2 = v2.reverse();

    //para multiplicar necesitamos un for
    var p2_producto = 0;

    for(var i = 0; i < v1.length; i++){
        p2_producto += v1[i] * v2[i];
    }

    document.querySelector('#p2_output').textContent = "el resultado es: " + p2_producto
}

function problema3(){
    const input = document.getElementById('p3-input').value;
    const output = document.getElementById('p3-output');
    
    const palabras = input.split(',');
    let palabraMax = "";
    let maxUnicos = 0;

    palabras.forEach(palabra => {
        const p = palabra.trim().toUpperCase();
        if (p) {
            const unicos = new Set(p).size;
            if (unicos > maxUnicos) {
                maxUnicos = unicos;
                palabraMax = p;
            }
        }
    });

    output.textContent = palabraMax ? 
        `${palabraMax} con ${maxUnicos} caracteres únicos.` : 
        "Datos inválidos";
}