import { Request, Response } from "express";
import bcrypt from "bcrypt";
import pool from "../db";
import { RegistrationData } from "../models/RegitsrationData";
import jwt from 'jsonwebtoken';

//request - incoming http request
//res - response to be sent back
export const registerUser = async (req: Request, res: Response) => {
  try {
    //desctructuring to extract userName, email and password from the request body
    const { username, email, password,role }: RegistrationData = req.body;
    //bcrypt - used for hashing
    //10 - determines complexity of hashing algorithm
    const hashedPassword = await bcrypt.hash(password, 10);

    //create request object using database connection pool
    const request = await pool
      .request()
      .input("username", username)
      .input("email", email)
      .input("password", hashedPassword)
      //set a default role if not provided
      .input("role",role || "user")

    //query to insert user data into users table
    const query = `INSERT INTO users(username,email,password,role) VALUES (@username,@email,@password,@role)`;

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


//asynchronous function that handles the login
//takes info from incoming request and prepares to send a response
export const loginUser = async(req:Request,res:Response)=>{
  try{
    //we extract users email and passsword from the requests data
    const{email,password} = req.body;
    const query = 'SELECT * FROM users WHERE email=@email'
    //get ready to communicate with the database by creating a request object from the database connection pool
    const request = await pool.request()
    //the database will replace @email with the actual email in the query
    const result = await request
    .input("email",email)
    .query(query)
    //we take the first user record from the results we got in the database
    const user = result.recordset[0]

    //if there is no user found with the provided email
    if(!user){
      return res.status(401).json({message:"Invalid credentials"})
    }

    //check if the provided password matches the stored password
    const isPasswordValid = bcrypt.compare(password,user.passsword)
    if(!isPasswordValid){
      return res.status(401).json({message:"Invalid credentials"})
    }

    //create a special token that identifies the user
    //the token includes user's Id and role and its signed with a secret key
    //we start with an expiration time of 1 hr for the token
    const token = jwt.sign({userId:user.id,role:user.role},'secret_key',{expiresIn:'1h'})
    //if everything went well we will respond with a success message and the generated token
    res.status(200).json({token})
  }catch(error){
    console.error("Error logging in",error);
    //we are using instanceof to check the type of error
    if(error instanceof jwt.JsonWebTokenError){
      res.status(401).json({message:"Invalid token"})
      //we are using instanceof to check the type of error
    }else if(error instanceof jwt.TokenExpiredError){
      res.status(401).json({message:"Token expired"})
    }else{
      res.status(500).json({message:"Internal server error"})
    }
  }
}


