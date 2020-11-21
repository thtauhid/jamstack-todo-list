const faunadb = require("faunadb")
const q = faunadb.query

exports.handler = async (event, context) => {
  const client = new faunadb.Client({
    secret: process.env.FAUNA_SECRET,
  })

  return client
    .query(q.Paginate(q.Match(q.Ref("indexes/todos"))))

    .then((res) => {
      const todoRef = res.data
      const getAllTodo = todoRef.map((ref) => {
        return q.Get(ref)
      })

      return client
        .query(getAllTodo)

        .then((res) => {
          return {
            statusCode: 200,
            body: JSON.stringify(res),
          }
        })
    })
}
