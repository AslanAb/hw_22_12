const users_block = document.querySelector(".users_block")
const cars_block = document.querySelector(".cars_block")
const creatUserBtn = document.querySelector("#creat_user_btn")
const creatCarBtn = document.querySelector("#creat_car_btn")

const BASE_URL = 'http://localhost:8080'
const loadDataUsers = async () => {
    const response = await fetch(BASE_URL + '/users')
    users_block.innerHTML = ''
    const data = await response.json()
    for (const user of data) {
        users_block.innerHTML += `<p>
                                        ${user.name}
                                        <button onclick="deleteUser(${user.id})">delete</button>
                                        </p>`
    }
}
const loadDataCars = async () => {
    const response = await fetch(BASE_URL + '/cars')
    cars_block.innerHTML = ''
    const data = await response.json()
    for (const car of data) {
        cars_block.innerHTML += `<p>
                                    ${car.model}
                                    <button onclick="deleteCar(${car.model})">delete</button>
                                    </p>`
    }    
}

loadDataUsers()
loadDataCars()

creatUserBtn.addEventListener('click', () => {
    const newUserName = document.querySelector('#new_user_name').value
    const payload = {
        name: newUserName
    }
    fetch(BASE_URL + '/users', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify(payload)
    }).then(() => loadDataUsers())
    .catch(() => alert("User creat error"))
})

creatCarBtn.addEventListener('click', () => {
    const newCarName = document.querySelector('#new_car_model').value
    const payload = {
        model: newCarName
    }
    fetch(BASE_URL + '/cars', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify(payload)
    }).then(() => loadDataCars())
    .catch(() => alert("Car creat error"))
})

const deleteUser = id => {
    fetch(BASE_URL + '/users/' + id, {
        method: 'delete'
    }).then(() => loadDataUsers())
    .catch(() => alert("User delete error"))
}

