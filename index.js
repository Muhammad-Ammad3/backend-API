import express from 'express';
import morgan from 'morgan';
import userRoutes from './routers/user.js';

const app = express();
const PORT = 4000

const tasks = [
    {
        id : 1,
        task : "complete project",
        completed : true,
    },
    {
        id : 2,
        task : "push github",
        completed : false,

    },
    {
        id : 3,
        task : "diploy vercel",
        completed : true,

    }
]


app.use(morgan("tiny"))

function middleware(req,res,next){
    req.requestBy = "Muhammad Ammad";
    next()
}

app.use(express.json())
app.use(middleware)




// params 
app.get("/singleTask/:id",(req,res) => {
const task = tasks.find((data) => data.id == req.params.id)
if(!task)
    {return res.status(404).send("task not found")}
   else   
   {return res.status(200).send(task)}
    
})

// query 
app.get("/",(req,res) => {
    console.log("req.query=>",req.query)
    const {completed} = req.query;
    let filter = tasks;
    if(completed)   
        filter = tasks.filter((data) => 
   completed == "true" ? data.completed == true : data.completed == false);
    res.status(200).send(filter);
})





app.use("/user",userRoutes)
app.listen(PORT , ()=> console.log("Server is running on port" + PORT))
