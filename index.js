const express = require('express')
const app = express()
const port = 3000
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`listening on http:/${port}`)
})

let courses = [
    { id: 1, name:"java"},
    { id: 2, name:"javaScript"},
    { id: 3, name:"Node"}
]

app.get('/courses', (req, res) =>{
    res.json(courses)
});

app.post('/courses',(req, res) =>{
    let singleCourse = {
        id: courses.length+1,
        name: req.body.name
    }
    courses.push(singleCourse);
    res.json(singleCourse);
})

app.put('/courses/:id', (req, res) =>{
  try{
    let singleCourse = courses.find((course) => {
      return course.id === +req.params.id
    })

    if(!singleCourse){
      res.status(404).send('course does not exist');
    }

    singleCourse.name = req.body.name;
    res.send(courses);
  } catch (err){
    res.status(500).send(err);
  }
})


// app.listen(port, () =>{
//     console.log("server started");
// });