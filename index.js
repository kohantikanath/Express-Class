const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`listening on http:/${port}`)
})

// app.get('/courses', (req, res) =>{
//     res.json(courses)
// });