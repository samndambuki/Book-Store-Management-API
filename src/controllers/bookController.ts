// controllers/bookController.ts
import { Request, Response } from 'express';
import pool from '../db';
import { Book } from '../models/Book';

// Create a new book
export const createBook = async (req: Request, res: Response) => {
  try {
    const { title, author } = req.body;
    const query = `INSERT INTO books (title, author) VALUES (@title, @author)`;
    const result = await pool.request()
      .input('title', title)
      .input('author', author)
      .query(query);

    res.status(201).json({ message: 'Book created successfully' });
  } catch (error) {
    console.error('Error creating book:', error);
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
