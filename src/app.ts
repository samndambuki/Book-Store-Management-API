import cors from "cors";
import express from "express";

const app = express();

app.use(cors())
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`app is listening on port ${PORT}`)
})

export default app;