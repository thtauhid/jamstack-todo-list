const faunadb = require("faunadb")
const q = faunadb.query

exports.handler = async (event, context) => {
  const client = new faunadb.Client({
    secret: process.env.FAUNA_SECRET,
  })

  const id = JSON.parse(event.body)

  return client
    .query(
      q.Update(q.Ref(q.Collection("todos"), id), {
        data: {
          crossed: true,
        },
      })
    )
    .then((res) => {
      return {
        statusCode: 200,
        body: JSON.stringify(res),
      }
    })
    .catch((err) => {
      return {
        statusCode: 400,
        body: JSON.stringify(res),
      }
    })
}
