import React, { useState, useEffect } from "react"

const App = () => {
  const [newTodo, setNewTodo] = useState("")

  const todoField = (e) => {
    e.preventDefault()
    setNewTodo(e.target.value)
  }
  const submitted = (e) => {
    e.preventDefault()
    console.log("submitted")
  }
  return (
    <>
      <form onSubmit={submitted}>
        <input
          type="text"
          name="todo"
          value={newTodo}
          placeholder="Create Todo"
          onChange={todoField}
        />
        <button type="submit" name="submit" value="submit">
          Create
        </button>
      </form>
    </>
  )
}

export default App
