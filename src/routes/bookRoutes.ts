// routes/bookRoutes.ts
import express from 'express';
import { createBook, getAllBooks } from '../controllers/bookController';

const router = express.Router();

// Route to create a new book
router.post('/books', createBook);

// Route to get all books
router.get('/books', getAllBooks);

export default router;
