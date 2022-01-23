let numberOfLeft = document.querySelector(".numOfLeft")
let mode = document.querySelector(".toDo-mode")
let backgroundImg = document.querySelector(".toDo-background")
let doneItems = []
let doneCircles = []
let done = false

mode.addEventListener('click', () => {
    if (mode.classList.contains("moon")) {
        mode.classList.replace("moon", "sun")
        backgroundImg.classList.replace("background-light", "background-dark")
        document.querySelector('body').style.background = "#000"
        document.documentElement.style.setProperty('--bg', 'rgb(87, 85, 116)')
        document.documentElement.style.setProperty('--color', '#fff')
        document.querySelector('.toDo-info').style.color = "#fff"
    }
    else {
        mode.classList.replace("sun", "moon")
        backgroundImg.classList.replace("background-dark", "background-light")
        document.querySelector('body').style.background = "#fff"
        document.documentElement.style.setProperty('--bg', '#fff')
        document.documentElement.style.setProperty('--color', '#000')
        document.querySelector('.toDo-info').style.color = "gray"
    }
})

let input = document.getElementById("toDo-input")          
input.addEventListener('keyup', (event) => {
    addNewTask(event, input.value)
    clearCompleted()  
    filter()
})
removeTask() 
doneTask() 

function addNewTask(event, text) {
    if (event.keyCode === 13 && text !== '') {
        let li = document.createElement("li")
        li.classList = "item"
        li.innerHTML = `<span class = circle></span>${text}<span class = remove></span>`
        document.querySelector(".items").appendChild(li)
        numberOfLeft.innerHTML ++
        input.value = ''
    }
}

function removeTask() {
    let items = document.querySelector(".items")
    items.addEventListener('click',(event) => {
        if (event.target.classList.contains('remove')) {
            event.target.parentElement.remove()
            if(doneItems.every(doneItem => doneItem !== event.target.parentElement.innerHTML)) {
                numberOfLeft.innerHTML --
            }
        }
    })
}

function doneTask() {
    let items = document.querySelector(".items")              
    items.addEventListener('click', (event) => {
        if (!event.target.classList.contains("circle")) return
        let result = doneCircles.some(doneCircle => doneCircle === event.target)
        done = result ? false : true
        event.target.style.background = done ? "linear-gradient(to right, rgb(140, 199, 255) 35%,rgb(174, 95, 226))" : "unset"
        done ? event.target.classList.add("done") : event.target.classList.remove("done")
        done ? event.target.parentElement.classList.add("checked") : 
            event.target.parentElement.classList.remove("checked")
        done ? doneItems.push(event.target.parentElement.innerHTML) :
            doneItems.forEach((item, index, arr) => {
                if (item === event.target.parentElement.innerHTML) {
                    arr.splice(index, 1)
                    index --
                }
            })
        done ? numberOfLeft.innerHTML -- : numberOfLeft.innerHTML ++
        done ? doneCircles.push(event.target) : doneCircles.forEach((doneCircle, index, arr) => {
            if (doneCircle === event.target) {
                arr.splice(index, 1)
                index --
            }
        })
    })
}

function clearCompleted() {
    let items = document.querySelectorAll(".items .item")
    let clearCompleted = document.getElementById("clearCompleted")
    clearCompleted.addEventListener('click', () => {
        items.forEach(item => {
            doneItems.forEach((doneItem, index, arr) => {
                if(item.innerHTML === doneItem) {
                    item.remove()
                    arr.splice(index, 1)
                    index --
                }
            })
        })
    })
}

function filter() {
    let items = document.querySelectorAll(".items .item")
    let all = document.getElementById("all")                       
    let active = document.getElementById("active")
    let completed = document.getElementById("completed")

    all.addEventListener('click', () => {                           //all
        numberOfLeft.parentElement.style.display = "block"
        numberOfLeft.parentElement.parentElement.style.justifyContent = "space-between"
        items.forEach(item => item.style.display = "flex")
    })

    active.addEventListener('click', () => {                        //active
        numberOfLeft.parentElement.style.display = "block"
        numberOfLeft.parentElement.parentElement.style.justifyContent = "space-between"
        items.forEach(item => {
            item.style.display = "flex"
            let checked = doneItems.some(doneItem => doneItem === item.innerHTML)
            if(checked) {
                item.style.display = "none"
            }
        })
    })

    completed.addEventListener('click', () => {                     //completed
        numberOfLeft.parentElement.style.display = "none"
        numberOfLeft.parentElement.parentElement.style.justifyContent = "center"
        items.forEach(item => {
            item.style.display = "flex"
            let checked = doneItems.some(doneItem => doneItem === item.innerHTML)
            if (!checked) {
                item.style.display = "none"
            }
        })
    })
}







