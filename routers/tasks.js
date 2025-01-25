import express from "express";
import Task from "../models/Tasks.js";
import sendResponse from "../helpers/sendResponse.js";
const router = express.Router();


router.post("/", async (req, res) => {
  const { task } = req.body;
  if (!task) {
    return sendResponse(res, 400, null, true, "Task is required");
  }
  try {
    let newTask = new Task({ task });
    newTask = await newTask.save();
    sendResponse(res, 201, newTask, false, "Task added successfully");
  } catch (error) {
    console.error(error);
    sendResponse(res, 500, null, true, "Failed to add task");
  }});


router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();
    sendResponse(res, 200, tasks, false, "Tasks fetched successfully");
  } catch (error) {
    sendResponse(res, 500, null, true, "Failed to fetch tasks");
  }
});

router.get("/:id" , async (req,res) => {
        const task = await Task.findById(req.params.id)
        if(!task){return(sendResponse(res, 404, null, true, "Failed to fetch tasks"))}
        sendResponse(res, 200, task, false, "Tasks fetched successfully");
})
router.put("/:id" , async (req,res) => {
    const { task, completed } = req.body
        const taskFromDB = await Task.findById(req.params.id)
        if(!taskFromDB){return(sendResponse(res, 404, null, true, "Failed to fetch tasks"))}
        if(task){taskFromDB.task = task}
        if(completed){taskFromDB.completed = completed}
        await taskFromDB.save()
        sendResponse(res, 200, taskFromDB, false, "Tasks updated successfully");
})
router.delete("/:id" , async (req,res) => {
        const taskFromDB = await Task.findById(req.params.id)
        if(!taskFromDB){return(sendResponse(res, 404, null, true, "Failed to fetch tasks"))}
        
        await Task.deleteOne({_id:req.params.id})
        sendResponse(res, 200, null, false, "Tasks deleted successfully");
})

export default router;
