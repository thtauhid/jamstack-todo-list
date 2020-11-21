const faunadb = require("faunadb")
const q = faunadb.query

exports.handler = async (event, context) => {
  const client = new faunadb.Client({
    secret: process.env.FAUNA_SECRET,
  })

  const data = JSON.parse(event.body)
  const newTodo = { data }

  return client
    .query(q.Create(q.Ref("classes/todos"), newTodo))
    .then((res) => {
      return {
        statusCode: 200,
        body: JSON.stringify(res),
      }
    })
    .catch((err) => {
      return {
        statusCode: 400,
        body: JSON.stringify(err),
      }
    })
}
