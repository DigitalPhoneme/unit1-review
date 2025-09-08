const express = require('express');
const app = express();

app.listen(3000, () =>{
    console.log('Server running on PORT 3000')
})


// Task: "Student Manager" - Create a `Student` class with `name`, `grade` and `getDetails` method.
// Build a function called processStudents(students): Filter>80, return uppercase name. 
// Test it with an array
// Hint: function: filter and map methods

class Student {
    constructor(name, grade){
        this.name = name;
        this.grade = grade
    }
    getDetails(){
        return `${this.name} has a grade of ${this.grade}`
    }
}

// const sharon = new Student("Sharon", 90)
// console.log(sharon.getDetails())

function processStudents(students){
    return students.filter(student => student.grade > 80)
    .map(student => student.name.toUpperCase())
}

const studentsArray = [
    new Student("Jeremy", 75),
    new Student("Hannah", 90),
    new Student("Kelly", 82),
    new Student("Oliver", 86),
    new Student("Lia", 50)
]
console.log(processStudents(studentsArray))

app.get('/students', (req, res) =>{
    res.json(studentsArray)
})

app.get('/top-students', (req, res) =>{
    res.json( studentsArray.map(student => student.name))
})

app.get('/student/:name', (req, res) =>{
    const student = studentsArray.find(s => s.name.toLowerCase() === req.params.name.toLowerCase());
    if (student){
        res.send(`<h1>${student.getDetails()}</h1>`)
    } else {
        res.send('<h1> Student Not Found </h1>')
    }
})

app.get('/students/filter', (req,res) => {
    let filteredStudents = studentsArray;
    if(req.query.minGrade){
        const minGrade = parseFloat(req.query.minGrade);
        filteredStudents = studentsArray.filter(s => s.grade >= minGrade)
    }
    res.json(filteredStudents)
})

app.get('/students/average', (req,res) => {
    const sum = studentsArray.reduce((total, s) => total + s.grade, 0);
    const average = sum/studentsArray.length;
    res.json(average)
})