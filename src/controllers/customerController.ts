import { Request, Response } from "express";
import pool from "../db";
import { Customer } from "../models/Customer";

export const createCustomer = async (req: Request, res: Response) => {
  try {
    const { name, email, address } = req.body;
    const query = `INSERT INTO customers(name,email,address) VALUES (@name,@email,@address)`;
    await pool
      .request()
      .input("name", name)
      .input("email", email)
      .input("address", address)
      .query(query);

    res.status(200).json({ message: "Customer created sucessfully" });
  } catch (error) {
    console.error("Errror creating customer", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};


export const getAllCustomers = async(req:Request,res:Response)=>{
 try{
  //select all columns from the customers table
  const query = `SELECT * FROM customers`;
  //execute the query using the request connection pools method
  const result = await pool.request().query(query)
  //extract an array of customers from the query results recordset
  const customers:Customer[] = result.recordset
  //respond with the array of customers as a json
  res.status(200).json(customers)
 }catch(error){
  console.error("Error fetaching customers",error)
  res.status(500).json({message:"Internal server error"})
 }

}

