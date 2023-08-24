import { Request, Response } from "express";
import bcrypt from "bcrypt";
import pool from "../db";
import { RegistrationData } from "../models/RegitsrationData";

//request - incoming http request
//res - response to be sent back
export const registerUser = async (req: Request, res: Response) => {
  try {
    //desctructuring to extract userName, email and password from the request body
    const { username, email, password }: RegistrationData = req.body;
    //bcrypt - used for hashing
    //10 - determines complexity of hashing algorithm
    const hashedPassword = await bcrypt.hash(password, 10);

    //create request object using database connection pool
    const request = await pool
      .request()
      .input("username", username)
      .input("email", email)
      .input("password", hashedPassword);

    //query to insert user data into users table
    const query = `INSERT INTO users(username,email,password) VALUES (@username,@email,@password)`;

    //execute the query using the request object
    await request.query(query);

    //successfu response back to the client
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.log("Error registering user", error);
    //error response back to client
    res.status(500).json({ message: "Internal server error" });
  }
};
