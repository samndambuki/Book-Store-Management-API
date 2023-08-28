import { Request, Response } from "express";
import pool from "../db";

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
