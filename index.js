function fetchAllDogs(){
    return fetch('https://dog.ceo/api/breeds/list/all')
    .then(reponse => reponse.json())
    .then(json => json.message)
}

function onAddDog(dog){
    return fetch('http://localhost:3000/myDogResearch',{
        method:"POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"           
        },
        body: JSON.stringify({
            breed: dog,
            note: ""
        })
    })
}

function fetchMyDogs(){
    return fetch('http://localhost:3000/myDogResearch')
    .then(reponse => reponse.json())
    .then(json => json)
}

function deleteMyDog(id){
    return fetch(`http://localhost:3000/myDogResearch/${id}`,{
        method: "DELETE"
    })
}

function updateMyDog(id){
    let breed = document.getElementById(id+'-breed').value; 
    let note = document.getElementById(id+'-note').value; 

    return fetch(`http://localhost:3000/myDogResearch/${id}`,{
        method: "PUT",
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({
            breed: breed,
            note: note
        })
    })
}

document.addEventListener('DOMContentLoaded', () => {
    fetchAllDogs().then(dogs => {
        Object.keys(dogs).forEach(dog => {
            let list = document.createElement('tr');
            list.innerHTML = `<td>${dog}</td><td>
            <button type="button" onclick="onAddDog('${dog}')" class="btn btn-primary">Add</button>
            </td>`;
            document.querySelector('#all-dogs').appendChild(list);
        });
    })

    fetchMyDogs().then(dogs => {
        dogs.forEach(dog => {
            let list = document.createElement('tr');
            list.innerHTML = `<td><input id="${dog.id + '-breed'}" class="form-control" type="text" value="${dog.breed}"></td>
            <td><input id="${dog.id + '-note'}" class="form-control" type="text" value="${dog.note}"></td>
            <td><button type="button" onclick="updateMyDog(${dog.id})" class="btn btn-primary">update</button></td>
            <td><button type="button" onclick="deleteMyDog(${dog.id})" class="btn btn-primary">delete</button>
            </td>`;
            document.querySelector('#my-dogs').appendChild(list);
        })
    })

});