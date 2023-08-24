// routes/bookRoutes.ts - sets up routes related to books
import express from "express";
import { createBook, getAllBooks, getBookById } from "../controllers/bookController";

//create an instance of the express router
//router object will be used to define routes for the application
const router = express.Router();

// Route to create a new book

//define a POST route at the path '/books' using router.POST method
//when a POST request is made, createBook function will be invoked
router.post("/books", createBook);

// Route to get all books

//we define a GET route at the path /books using router.get() method
//when a GET request is made to this endpount, getAllBooks function will be invoked to hanlde the request
router.get("/books", getAllBooks);

//get single book by id
router.get("/books/:id",getBookById)

//export the router object so that it can be imported and used in other parts of the application
export default router;
