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

export const getAllCustomers = async (req: Request, res: Response) => {
  try {
    //select all columns from the customers table
    const query = `SELECT * FROM customers`;
    //execute the query using the request connection pools method
    const result = await pool.request().query(query);
    //extract an array of customers from the query results recordset
    const customers: Customer[] = result.recordset;
    //respond with the array of customers as a json
    res.status(200).json(customers);
  } catch (error) {
    console.error("Error fetaching customers", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getCustomerById = async (req: Request, res: Response) => {
  //try catch to handle any potential errors that might occur during execution of the code
  try {
    //exrtacts customerId from the url parameters of the request
    const customerId = req.params.id;
    //select all customers where the id matches the provided customerId
    const query = `SELECT * FROM customers WHERE id=@customerId`;
    //execute the query using the connection pools request
    //provide customerId as the parameter to the query
    const result = await pool
      .request()
      .input("customerId", customerId)
      .query(query);
    //result of the query is stored in the result variable
    //.recordset contains an array of customer records
    //here we are extracting the first customer record and casting it into a customer object
    const customer: Customer = result.recordset[0];
    //if no customer was found
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    //if a customer was found
    //return customer as a json
    res.status(200).json(customer);
  } catch (error) {
    //logs error message
    console.error("Error getting customer", error);
    //sends a response with a status code of 500
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateCustomer = async (req: Request, res: Response) => {
  try {
    const customerId = req.params.id;

    const { name, email, address } = req.body;

    const query = `UPDATE customers SET name=@name,email=@email,address=@address WHERE id=@customerId`;

    const result = await pool
      .request()
      .input("customerId", customerId)
      .input("name", name)
      .input("email", email)
      .input("address", address)
      .query(query);

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.status(200).json({ message: "Customer updated successfully" });
  } catch (error) {
    console.error("Error updating customer", error);
    res.status(500).json({ message: "Interna server error" });
  }
};

export const deleteCustomer = async (req: Request, res: Response) => {
  try {
    const customerId = req.params.id;
    const query = `DELETE FROM customers WHERE id=@customerId`;
    const result = await pool
      .request()
      .input("customerId", customerId)
      .query(query);

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.status(200).json({ message: "Customer deleted successfully" });
  } catch (error) {
    console.error("Error deleting customer", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
