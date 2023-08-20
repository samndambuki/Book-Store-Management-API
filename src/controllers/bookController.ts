// controllers/bookController.ts
import { Request, Response } from 'express';
import pool from '../db';
import { Book } from '../models/Book';

// Create a new book


//defines an exported function that's asynchronous
//takes two parameters, request, response
export const createBook = async (req: Request, res: Response) => {
  //indicates we are going to attempt some operations that might throw an error
  try {
    //detsructuring data properties from req.body object
    //req.body holds data sent in the request body
    const { title, author } = req.body;
    //create an sql query string using a template literal
    const query = `INSERT INTO books (title, author) VALUES (@title, @author)`;

    //send the sql query to database
    //result of the query is stored in result variable
    const result = await pool.request()
      .input('title', title)
      .input('author', author)
      .query(query);

      //201  - successful creation
    res.status(201).json({ message: 'Book created successfully' });
  } catch (error) {
    console.error('Error creating book:', error);
    //500 - Internal server error
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Get all books
export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const query = `SELECT * FROM books`;
    const result = await pool.request().query(query);
    const books: Book[] = result.recordset;

    res.status(200).json(books);
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
