const express = require('express')
const app = express()
const port = 3000
app.use(express.json());
app.use(middleWare);
app.use(logger);

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



function middleWare(req,res,next){
  console.log("called");
  next();
}

app.delete('/courses',(req,res)=>{
  const deletedCourse = courses[req.body.id-1];
  courses.splice(req.body.id-1,1);
  res.send(deletedCourse);
})

function logger(req, res, next){
  console.log(req.ip);
  console.log(req.hostname);
  console.log(new Date());
  console.log(req.method);
  next();
}
// app.listen(port, () =>{
//     console.log("server started");
// });