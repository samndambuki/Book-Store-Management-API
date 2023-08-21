-- books.sql

CREATE TABLE books (
  id INT PRIMARY KEY IDENTITY,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  quantity_in_stock INT NOT NULL,
  description TEXT,
  published_year INT,
  genre VARCHAR(100),
  created_at DATETIME DEFAULT GETDATE(),
  updated_at DATETIME DEFAULT GETDATE()
);




DROP table books;

SELECT * FROM Books;