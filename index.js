/// basic constructor function
function makeHuman(name, age) {
  this.name = name;
  this.age = age;
}

//this is the inheritence in js
makeHuman.prototype.printMyName = function () {
  console.log(this.name);
};

const human1 = new makeHuman("Deepak", 23);
const human2 = new makeHuman("Sohan", 23);

//closures :- function which returns the second function and use the variable of parent function;
function Incrementor() {
  let num = 0;
  return function () {
    num++;
    console.log(num);
  };
}
const fun1 = Incrementor();
// fun1();

//try catch

function divide(a, b) {
  try {
    if (b == 0) {
      throw Error("b can't be 0");
    }
    console.log(a / b);
  } catch (error) {
    console.error(error);
  }
}
// divide(12,0);

//Custom Events :- create and call custom events
const evt = new Event("chacha");
document.querySelector(".btn1").addEventListener("chacha", () => {
  alert("chacha event is called");
});
document.querySelector(".btn2").addEventListener('click',()=>{
    document.querySelector(".btn1").dispatchEvent(evt);
})

//check