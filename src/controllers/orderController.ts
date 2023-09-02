import { Request,Response } from "express"
import { Customer } from "../models/Customer";
import pool from "../db";

//function to create a new order
export const createOrder = async(req:Request,res:Response)=>{
    try{
        //extract customerId from authenticated users token
        const customerId = req.user as Customer;
        //extract book Ids and quantities from the request body
        const {books} = req.body
        //insert order into orders table
        const orderQuery  = `INSERT INTO orders(customer_id) VALUES(@customer_id)`
        const orderResult = await pool.request()
        .input("customerId",customerId)
        .query(orderQuery)

        //insert order items into OrderItems table
        
    }catch(error){

    }
}