// controllers/bookController.ts
import { Request, Response, query } from "express";
import pool from "../db";
import { Book } from "../models/Book";
import authMiddleware from "../middlewares/authMiddleware";

// Create a new book

//defines an exported function that's asynchronous
//takes two parameters, request, response
export const createBook = async (req: Request, res: Response) => {
  //indicates we are going to attempt some operations that might throw an error
  try {
    //detsructuring data properties from req.body object
    //req.body holds data sent in the request body

    authMiddleware(req,res,async()=>{
      const {
        title,
        author,
        price,
        quantity_in_stock,
        description,
        published_year,
        genre,
      } = req.body;
      //create an sql query string using a template literal
      const query = ` INSERT INTO books (title, author, price, quantity_in_stock, description, published_year, genre)
      VALUES (@title, @author, @price, @quantity_in_stock, @description, @published_year, @genre)`;
  
      //send the sql query to database
      //result of the query is stored in result variable
      const result = await pool
        .request()
        .input("title", title)
        .input("author", author)
        .input("price", price)
        .input("quantity_in_stock", quantity_in_stock)
        .input("description", description)
        .input("published_year", published_year)
        .input("genre", genre)
        .query(query);
  
      //201  - successful creation
      res.status(201).json({ message: "Book created successfully" });
    })
   
  } catch (error) {
    console.error("Error creating book:", error);
    //500 - Internal server error
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get all books
//takes to arguments, req: incoming request object, res:outgoinh response object
export const getAllBooks = async (req: Request, res: Response) => {
  //logic for fetching and sending books
  try {
    //query to select all columns from books table
    const query = `SELECT * FROM books`;
    //await - operation should be awaited since its asychronous
    //creates a request to database using connection pool
    //result fo the query is stored in a result variable
    const result = await pool.request().query(query);
    //recrdset - contains the rows returned by sql query
    //type annotation Book[] indicatses books variable is expected to be an array of objects that match the Book type
    const books: Book[] = result.recordset;

    //200 - OK
    res.status(200).json(books);
  } catch (error) {
    //if an error occurs inside the try block, the cod einside the catch blick will execute
    console.error("Error fetching books:", error);
    //500 - internal server error
    res.status(500).json({ message: "Internal Server Error" });
  }
};


//Get one book

//define an exported asynchrnonous function
export const getBookById = async (req: Request, res: Response) => {
  try {
    //retreive id from request url parameters and stores it in the bookId variable
    const bookId = req.params.id;
    
    //select books where the id matches the proided bookId
    const query = `SELECT * FROM books WHERE id = @bookId`;
    //sends query using the connection pools request() method
    //provides bookId as a parameter to teh query
    const result = await pool.request().input("bookId", bookId).query(query);

    //extract first record 
    const book = result.recordset[0];

    //if book is not found
    if (!book) {
      return res.status(400).json({ message: "Book not found" });
    }
    //if found, returns book info in json format
    res.status(200).json(book);
  } catch (error) {
    console.error("Error getting book", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
