//Esquema ES6

/*
Para JS ya conocemos el concepto de var

Se sustituyen por las nuevas variables:
let --> es una variable de tipo comillas protegidas, ya que solo funciona dentro de un fragmeento de codigo

const --> es una constante
*/

/* if(true){
    const x = "x";
    console.log(x);
}
let x = "y";
console.log(x);
*/

//una funcion flecha en JS a diferencia de una funcion normal no generea sun propio contexto (this), necesita ser declarada antes de ser usada y no necesita un return

//function cosa(String hola) {String cosa; this.hola = hola}
// funcion que sume dos numwros

/*
function sumarnumeros(n1,n2){
    return n1+n2;
}
const sumarDosNumeros = (n1,n2) => n1+n1;
console.log(`la suma de la funcion es: (2,3): ${sumarnumeros(2,3)}`);
console.log(`la suma de la funcion es: (4,3): ${sumarDosNumeros(4,3)}`);
*/

//para armar una funcion flecha debemos entender su estructura:
// "cadena" (el tipo de variable, nombre de la funcion y los argumentos) => operacion

const razaDePerros = [
    "Gran Danes",
    "Doverman",
    "Pastor Aleman",
    "Pitbull",
    "San Bernando",
    "Chihuahua",
    "Xoloscuincle",
];
/*
for(let i = 0; i < razaDePerros.length; i++){
    console.log(razaDePerros[i]);
}

for(const raza of razaDePerros){
    console.log(raza);
}

for(const indice in razaDePerros){
    console.log(razaDePerros[indice]);
}
*/
// forEach Iterar sobre elementos de arreglo que devuelven nada

// razaDePerros.forEach((raza, indice, arregloOriginal) => console.log(raza));

// razaDePerros.forEach(raza => console.log(raza));

// Necesitamos una funcion para buscar la raza Chihuahua y si no existe agregarla

// function map esta funcion itera sobre los elemntos del arreglo y regresa uno diferente, con el podemos hacer lo que queramos sin necesidad de modificar e arreglo anterior

/* const razasDePerrosEnMayusculas = razaDePerros.map((razaDePerros, indice, arregloOriginal) => console.log(razaDePerros.toUpperCase()));
*/

if(razaDePerros.find(raza => raza === "Chihuahua")){
    console.log("La raza si se encontro y es Chihuahua")
    console.log(razaDePerros);
}else{
    razaDePerros.push("Chihuahua");
    console.log("Se agrego Chihuahua al arreglo");
    console.log(razaDePerros);
}