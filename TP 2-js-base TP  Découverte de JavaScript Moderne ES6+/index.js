// exercice 1
// var x = 5;
// let y = 10;
// const z = 15;

// x = 20; 
// y = 25; 
// z = 30; 

// exercice 2
function testScope() {
  if (true) {
    var a = "var visible partout";
    let b = "let visible ici seulement";
  }
  console.log(a); // OK
  console.log(b); // Erreur : b n'est pas accessible ici
}

testScope();

// exercice 3 
function sayHello(name) {
  return `Bonjour ${name}`;
}

const sayHelloArrow = (name) => `Bonjour ${name}`;

console.log(sayHello("Hamza"));
console.log(sayHelloArrow("Hamza"));


// exercice 4

const person = {
  name: "Sara",
  sayHello: function () {
    console.log("Bonjour " + this.name);
  },
  sayHelloArrow: () => {
    console.log("Bonjour " + this.name);
  },
};

person.sayHello();       // Bonjour Sara
person.sayHelloArrow();  // Bonjour undefined 

// exercice 5:

import message, {PI, carre } from " ./mathutils.js"
message () ;
console.log 
