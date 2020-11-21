const createTodo = (data) => {
  return fetch("/.netlify/functions/createTodo", {
    body: JSON.stringify(data),
    method: "POST",
  }).then((res) => {
    return res.json()
  })
}

const markDone = (id) => {
  return fetch("/.netlify/functions/markDone", {
    body: JSON.stringify(id),
    method: "POST",
  }).then((res) => {
    return res.json()
  })
}

const getAllTodo = () => {
  return fetch("/.netlify/functions/getAllTodo").then((res) => {
    return res.json()
  })
}

const api = {
  createTodo,
  markDone,
  getAllTodo,
}

export default api
