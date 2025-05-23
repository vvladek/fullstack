const addButton = document.querySelector(".add__button")
const textInput = document.querySelector(".text__input")
const body = document.querySelector("body")


function createTodo (id, text) {
  const div = document.createElement("div")
  div.classList.add("todo")
  const p = document.createElement("p")
  p.classList.add("text")
  div.append(p)
  p.textContent = text
  const editButton = document.createElement("button")
  editButton.classList.add("edit__button")
  editButton.textContent = "Edit"
  editButton.addEventListener("click", async () => {
    const editId = id
    await fetch(`https://nefarious.it/todos/edit?id=${editId}&text=${textInput.value}`)
    renderTodos()
    textInput.value = ""
  })
  div.append(editButton)
  const deleteButton = document.createElement("button")
  deleteButton.classList.add("delete__button")
  deleteButton.textContent = "Delete"
  deleteButton.addEventListener("click", async () => {
    const buttonId = id
    await fetch(`https://nefarious.it/todos/delete?id=${buttonId}`)
    renderTodos()
  })
  div.append(deleteButton)
  body.prepend(div)
}


async function renderTodos () {
  const todos = document.querySelectorAll(".todo")
  for (let todo of todos) {
    todo.remove()
  }
  const promise = await fetch("https://nefarious.it/todos")
  const newTodos = await promise.json()
  for (let todo of newTodos) {
    createTodo(todo._id, todo.text)
  }
}


addButton.addEventListener("click", async () => {
  await fetch(`https://nefarious.it/todos/add?text=${textInput.value}`)
  renderTodos()
  textInput.value = ""
})



renderTodos()