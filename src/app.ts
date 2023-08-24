//import various modules
import cors from "cors";
import express from "express";
import bookRoutes from "./routes/bookRoutes";
import userRoutes from "./routes/userRoutes";

//initialize an instance of the express application
const app = express();

//cors - middleware
//allows our server to accept requests from various origins/domains
//enables cross origin requests
app.use(cors());
//express - framework for building web applications in nodejs
//extracts and parse json data
app.use(express.json());

// Use the bookRoutes
app.use("/api", bookRoutes);

//use userRoutes
app.use("/api",userRoutes)

//allows you specify port number through environment variables
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`app is listening on port ${PORT}`);
});

//alllows you use app in other parts of your code
export default app;
