const { error } = require('console');
const express = require('express');
const { parse } = require('path');
const app = express();
app.use(express.json())

app.listen(3000, () =>{
    console.log('Server running on PORT 3000')
})
app.use(express.static('public'))

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

app.get('/', (req,res) =>{
    res.sendFile(__dirname + '/public/index.html')
})
app.get('/students', (req, res) =>{
    res.json(studentsArray)
})

app.post('/students', (req, res) => {
    const { name, grade} = req.body;
    if ( !name || typeof name !== 'string' || name.trim() === ''){
        return res.status(400).json({error: 'Name is required and must be a non-empty string'})
    }
    const parsedGrade = parseFloat(grade);
    if ( isNaN(parsedGrade) || parsedGrade < 0 || parsedGrade > 100){
        return res.status(400).json({error: 'Grade must be a number between 0 and 100'})
    }

const existingStudent = studentsArray.find(s => s.name.toLowerCase() === name.toLowerCase());
if (existingStudent){
    return res.status(409).json({error: 'Student with this name already exists'})
}
const newStudent = new Student(name.trim(), parsedGrade);
studentsArray.push(newStudent)
res.status(201).json(newStudent)
})

app.get('/top-students', (req, res) =>{
    res.json( studentsArray.map(student => student.name))
})

app.get('/students/:name', (req, res) =>{
    const student = studentsArray.find(s => s.name.toLowerCase() === req.params.name.toLowerCase());
    if (student){
        res.send(`<h1>${student.getDetails()}</h1>`)
    } else {
        res.send('<h1> Student Not Found </h1>')
    }
})

app.put('/students/:name', (req,res) => {
    const {name} = req.params;
    const {grade} = req.body;
    const parsedGrade = parseFloat(grade);
    if (isNaN(parsedGrade) || parsedGrade < 0 || parsedGrade > 100){
        return res.status(400).json({error: 'grade must be a number between 0 and 100'})
    }
    const student = studentsArray.find(s => s.name.toLowerCase() === name.toLowerCase())
    if (!student){
        return res.status(404).json({error: 'Student not found'})
}

student.grade = parsedGrade;
res.json(student)
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