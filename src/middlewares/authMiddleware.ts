import { Request,Response,NextFunction } from "express";
import jwt from 'jsonwebtoken';

//define the middelware function
export default(req:Request,res:Response,next:NextFunction)=>{
    //retrieve token
    const token = req.header('auth-token')
    //check if the token is missing
    if(!token){
        return res.status(401).json({message:"Access denied"})
    }
    try{
        //verify the token using the 'secret_key'
        const decoded:any = jwt.verify(token,'secret_key')
        //attach the decoded user info to the request object
        req.user = decoded
        //call the next middleware
        next()
    }catch(error){
        console.error("Authentication error",error)
        res.status(401).json({message:"Invalid token"})
    }
}