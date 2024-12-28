import express from "express";

const router = express.Router()
const users = [
    {
        fullName : "Ammad",
        email : "ammad0598@gmail.com",
        id : 1 ,
    }
];

router.get("/" , ( req , res ) => {
    res.status(200).json({
        error: false,
        data: users,
        message: "User data fetched successfully",
    })
})
router.post("/" , ( req , res ) => {
   const { fullName , email } = req.body;
   console.log("fullName=>",fullName);
   console.log("email=>",email);
   
   users.push({fullName , email , id : users.length + 1})
   res.status(201).json({
    error: false,
    data: users,
    message: "User added successfully",
})
})
router.get("/:id" , ( req , res ) => {
    const user = users.find((data) => data.id == req.params.id)
    if(!user){
        res.status(404).json({
            error: true,
            data: null,
            message: "User not found",
        })
    }else{
        res.status(200).json({
         error: false,
         data: user,
         message: "User found successfully",
        })
    }
})

export default router;