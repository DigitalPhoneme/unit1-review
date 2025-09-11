document.getElementById('filterForm').addEventListener('submit', async (e) =>{
    e.preventDefault();
    const minGrade = document.querySelector('input[name="minGrade"').value;
    console.log(minGrade,'MIN GRADE')
    const url = `/students/filter?minGrade=${minGrade}`

    try {
        const response = await fetch(url);
        const students = await response.json();
        const resultsDiv = document.getElementById('results')
        if(students.length === 0){
            resultsDiv.innerHTML = '<p> No Students Found</p>'
            return
        }
        const list = students.map(s => `<li>${s.name}: ${s.grade} </li>`).join('')
        resultsDiv.innerHTML = `<ul>${list}</ul>`
        console.log(students,"STUDENTS")
    } catch(error){
        resultsDiv.innerHTML = '<p> Error fetching students data </p>'
        console.log("error")
    }
})

document.getElementById('addForm').addEventListener('submit', async(e) => {
    e.preventDefault();
    console.log("add form clicked")
    const name = document.querySelector('#addForm input[name="name"]').value
    const grade = document.querySelector('#addForm input[name="grade"]').value;

    try{
        const response = await fetch('/students', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({name, grade})
        });
        const result = await response.json()
        const resultsDiv = document.getElementById('results');
        if(response.ok){
            resultsDiv.innerHTML = `<p>Added ${result.name} with grade ${result.grade}</p>` + resultsDiv.innerHTML

        } else {
            resultsDiv.innerHTML = `<p>${result.error}</p>`
        }
        } catch (error){
            document.getElementById('results').innerHTML = '<p>Error adding student</p>'
            console.log("error", error)
        }
    
})

document.getElementById('updateForm').addEventListener('submit', async(e) => {
    e.preventDefault();
    const name = document.querySelector('#updateForm input[name="name"]').value
    const grade = document.querySelector('#updateForm input[name="grade"]').value
    try{
        const response = await fetch(`/students/${encodeURIComponent(name)}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({grade})
        })
        const result = await response.json();
        const resultsDiv = document.getElementById('results');
        if (response.ok){
            resultsDiv.innerHTML = `<p> Updated ${result.name}'s grade to ${result.grade}</p>` + resultsDiv.innerHTML
        } else {
            resultsDiv.innerHTML = `<p> ${result.error}</p>`
        }

    }catch(error){
        document.getElementById('results').innerHTML = '<p> Error Updating Student </p>'
        console.log("error", error)
    }
})