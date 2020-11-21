import React, { useState, useEffect } from "react"
import "./App.css"
import "./api"
import api from "./api"

const App = () => {
  const [newTodo, setNewTodo] = useState("")
  const [allTodo, setAllTodo] = useState([""])
  const [isUpdated, setIsUpdated] = useState("")

  useEffect(() => {
    api
      .getAllTodo()
      .then((res) => {
        const allTodo = res.map((todo) => {
          const { id: key } = todo.ref["@ref"]
          const { title, crossed } = todo.data
          return {
            key,
            title,
            crossed,
          }
        })
        setAllTodo(allTodo)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [isUpdated])

  const todoField = (e) => {
    e.preventDefault()
    setNewTodo(e.target.value)
  }

  const submitted = (e) => {
    e.preventDefault()
    const todo = {
      title: newTodo,
      crossed: false,
    }

    api
      .createTodo(todo)
      .then((res) => {
        setNewTodo("")
        setIsUpdated(res.ref["@ref"].id)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const TodoItem = ({ title, id }) => {
    const markDone = (id) => {
      api
        .markDone(id)
        .then((res) => {
          setIsUpdated(id)
        })
        .catch((err) => {
          console.log(err)
        })
    }
    return (
      <>
        <div className="todo_item">
          <div className="todo_item_title">{title}</div>
          <div
            className="todo_item_cross"
            onClick={() => {
              markDone(id)
            }}
          >
            Done
          </div>
        </div>
        <hr />
      </>
    )
  }

  const CrossedItem = ({ title }) => {
    return (
      <>
        <div className="todo_item">
          <div className="todo_item_title">
            <del>{title}</del>
          </div>
        </div>
        <hr />
      </>
    )
  }

  return (
    <div className="container">
      {/* Input Form */}
      <form onSubmit={submitted}>
        <input
          className="todo_input"
          type="text"
          name="todo"
          value={newTodo}
          placeholder="Create Todo"
          onChange={todoField}
          required
        />
        <input
          className="todo_button"
          type="submit"
          name="submit"
          value="Create"
        />
      </form>

      {/* Todo List */}
      <div className="todo_list">
        {allTodo
          .filter(({ crossed }) => crossed === false)
          .map(({ key, title }) => {
            return <TodoItem key={key} id={key} title={title} />
          })}

        {allTodo
          .filter(({ crossed }) => crossed === true)
          .map(({ key, title }) => {
            return <CrossedItem key={key} title={title} />
          })}
      </div>
    </div>
  )
}

export default App
