const addButton = document.querySelector(".add__button")
const textInput = document.querySelector(".text__input")


async function getTodos () {
  fetch("https://nefarious.it/todos").then(response => {
    return response.json()
  }).then(data => {
    console.log(data)
  }).catch(error => {
    alert(error)
  })
}

function createTodo () {
  const div = document.createElement("div")
  div.classList.add("todo")
  const p = document.createElement("p")
  p.classList.add("text")
  const editButton = document.createElement("button")
  editButton.classList.add("edit__button")
  const deleteButton = document.createElement("button")
  editButton.classList.add("delete__button")
}


async function renderTodos () {
  const todos = document.querySelectorAll(".todo")
  for (let todo of todos) {
    todo.remove()
  }
  const newTodos = await getTodos()
  console.log(newTodos)
}


addButton.addEventListener("click", () => {
  renderTodos()
})