import express from "express"
import { createCustomer, getAllCustomers } from "../controllers/customerController";


const router = express.Router();


router.post("/customers",createCustomer)

router.get("/customers",getAllCustomers)

export default router;