import cors from "cors";
import express from "express";
import bookRoutes from "./routes/bookRoutes";

const app = express();

app.use(cors())
app.use(express.json());

// Use the bookRoutes
app.use('/api', bookRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`app is listening on port ${PORT}`)
})

export default app;