import express from 'express';
import morgan from 'morgan';
import userRoutes from './routers/user.js';

const app = express();
const PORT = 4000

const tasks = [
    {
        id : 1,
        task : "complete project"
    },
    {
        id : 2,
        task : "push github"
    },
    {
        id : 3,
        task : "diploy vercel"
    }
]


app.use(morgan("tiny"))

function middleware(req,res,next){
    req.requestBy = "Muhammad Ammad";
    next()
}

app.use(express.json())
app.use(middleware)

app.get("/",(req,res)=>{
    console.log("req.requestBy=>",req.requestBy);
    res.status(200).send(tasks);
})
app.use("/user",userRoutes)
// app.post("/",(req,res)=>{
//     console.log("req.body=>",req.body)
    
//     res.send("Post request called succesfully");
// })
// app.put("/",(req,res)=>{
//     res.send("Put request called succesfully");
// })
// app.delete("/",(req,res)=>{
//     res.send("Deleted request called succesfully");
// })

app.listen(PORT , ()=> console.log("Sesrver is running on port" + PORT))
