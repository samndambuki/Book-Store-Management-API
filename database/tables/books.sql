-- books.sql

CREATE TABLE books (
  id INT IDENTITY(1,1) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL
);


DROP table books;

SELECT * FROM Books;