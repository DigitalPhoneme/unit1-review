// const student = {
//     name: "Alice",
//     grade: 90,
//     greet: function (){
//         return `Hi, I'm ${this.name}!`
//     }
// }

// console.log(student.name)
// console.log(student.greet())
// student.age = 20;
// console.log(student)

// // different functions types

// // function declaration
// console.log(add(2,3))
// function add(a, b){
//     return a + b;
// }

// // function expression

// const multiply = function (x, y){
//     return x * y;
// }

// // arrow function

// const divide = (x, y) => x/y;


// console.log(multiply(2,4))
// console.log(divide(10, 2))

// // object w/ name, age and introduce method. we also need a function
// // that increments the person's age by 1. test with logs. inputs: initially, none
// // outputs: strings and numbers

// // step 1 create our object
// // create a person obj : name = Kendra, age= 19, introduce = function returning I'm
// // name + and I'm age + years old


// const person = {
//     name: 'Kendra',
//     age: 19,
//     introduce: function() {
        
//         return `I'm ${this.name}, and I'm ${this.age} years old.`
//     }
// }

// // step 2 function to modify our age number and increment by 1
// // function called incrementAge: take a person (object), add 1 to the value of age,
// // return new age

// function incrementAge(person){
//     person.age += 1;
//     return person.age
// }

// // final step is to test

// console.log(person.introduce())
// incrementAge(person)
// console.log(person.age)

// class Student{
//     constructor(name, grade){
//         this.name = name
//         this.grade = grade
//     }
//     study(){
//         return `${this.name} is studying and has a grade of ${this.grade}.`
//     }
//     improveGrade(points){
//         this.grade += points;
//         return this.grade;
//     }
// }

// const bob = new Student("Bob", 85)



// console.log(bob)
// console.log(bob.study())
// console.log(bob.improveGrade(5))
// console.log(bob)

// class Car{
//     constructor(make, model, speed){
//         this.make = make;
//         this.model = model;
//         this.speed = speed;
//     }
//     accelerate(speedIncrease){
//         this.speed += speedIncrease;
//         return `${this.make} ${this.model} is now going ${this.speed} mph.`
//     }
// }

// const myCar = new Car("Subaru", "Outback", 45)

// console.log(myCar)
// console.log(myCar.accelerate(40))

// Array methods review

const numbers = [1,2,3,4,5]

console.log(numbers.map(n => n * 2)); // [2,4,6,8,10]
console.log(numbers.filter(n => n % 2 === 0)); // [2,4]

console.log(numbers.reduce((sum,n) => sum + n, 0)) //15

numbers.forEach(n => console.log(n)) // 1,2,3,4,5 but on separate lines

console.log(numbers.find(n => n > 3)); // 4


const students = [
  {name: "Alice", grade: 90},
  {name: "Bob", grade: 85},
  {name: "Charlie", grade: 95}
];

// 1. map for names array
// 2. filter for grades > 88
// 3. reduce for average grade

const names = students.map(s => s.name)
console.log(names)
const highGrades = students.filter(s => s.grade > 88)
console.log(highGrades)
const average = students.reduce((sum,s) => sum + s.grade, 0) / students.length;
console.log(average)

// String Methods

const text = "Hello, JavaScript!"

console.log(text.toUpperCase())
console.log(text.split(" "))
console.log(text.includes("Java"))
console.log(text.replace("JavaScript", "World"))
console.log(text.slice(5, 9))

// Task: with `input = "john,doe,30,developer";

// 1. `split` to array
// 2. Capitalize first (name)
// 3. Sentence. "[Name] is a developer"

// Break it: Split -> Capitalize -> Build string. 

const input = "john,doe,30,developer"
const parts = input.split(",")
  console.log(parts)
  const name = parts[0].charAt(0).toUpperCase() + parts[0].slice(1)
  console.log(name)
const sentence = `${name} is a ${parts[3]}`
console.log(sentence)