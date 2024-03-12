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