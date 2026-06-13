var instrucciones = [
    "Utiliza las flechas de navegacion para mover las piezas",
    "Para ordenar las piezas guiate por la imagen objetivo"
];

// para guardar los movimiento necesitamos un arreglo

var movimientos = [];

// necesito saber las pocisiones del rompecabezas

var rompe = [
    [1,2,3],
    [4,5,6],
    [7,8,9]
];

// necesito otra var para saber que el orden del rompecabezas es el correcto

var rompeCorrecta = [
    [1,2,3],
    [4,5,6],
    [7,8,9]
];

// necesito conocer la posicion de la pieza vacia

var filaVacia = 2;
var columnaVacia = 2;

// necesito una funcion que se encargue de mostrar la lista de instrucciones

function mostrarIntrucciones(intrucciones){
    for( var i = 0; i < intrucciones.lenght; i++){
        mostrarIntruccionesLista(intrucciones[i], "lista-intrucciones");
    }
}

function mostrarInstruccionesLista(instruccion, idLista){
    var ul = document.getElementById(idLista);
    var li = document.createElement("li");
    li.textContent = instruccion;
    ul.appendChild(li);
}