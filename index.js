import express from 'express';
import morgan from 'morgan';
import userRoutes from './routers/user.js';
import "dotenv/config";
import mongoose from 'mongoose';
import taskRoutes from "./routers/tasks.js";
import authRoutes from "./routers/auth.js"
const app = express();
const PORT = process.env.PORT || 4000;
console.log("MONGODBURI=>", process.env.MONGODBURI);

if (!process.env.MONGODBURI) {
  console.error("MongoDB URI is missing in the environment variables.");
}

mongoose.connect(process.env.MONGODBURI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

app.use(morgan("tiny"));
app.use(express.json()); 

app.use("/task", taskRoutes);
app.use("/user", userRoutes); 
app.use("/auth", authRoutes); 

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
