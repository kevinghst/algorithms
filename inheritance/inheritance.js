function Dog (name) {
  this.name = name;
}

function Animal (breed) {
  this.breed = breed;
}

const myAnimal = new Animal();
const myDog = new Dog();

// myAnimal's __proto__ references Animal.prototype
// myDog's __proto__ references Dog.prototype

// When you call any property in the prototype, it will recursively look at the prototype's __proto__ property to continue up the prototype chain.

// We don't do Dog.prototype = Animal.prototype because that means any function aded to Dog would also be added to Animal

// We really want something like Dog.prototype.__proto__ == Animal.prototype

Dog.prototype.__proto__ = Animal.prototype;
Object.setPrototypeOf(Dog.prototype, Animal.prototype);

// The above two lines work for setting inheritance, but it suboptimal because they mutate the Dog's prototype.

// Below is the proper way to do this:

function Animal (name) {
  this.name = name;
}

Animal.prototype.sayHello = function(){
  console.log("hello, my name is" + this.name);
};

function Dog (name, coatColor) {
  Animal.call(this, name);
  this.coatColor = coatColor;
}

Dog.prototype = Object.create(Animal.prototype);

Dog.prototype.bark = function() {
  console.log("Bark!");
};

const liesel = new Dog("Liesel");

liesel.bark();
liesel.sayHello();
