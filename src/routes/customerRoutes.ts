import express from "express"
import { createCustomer } from "../controllers/customerController";


const router = express.Router();

router.post("/customers",createCustomer)

export default router;