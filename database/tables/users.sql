CREATE TABLE users(
    id INT PRIMARY KEY IDENTITY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL
)

SELECT * FROM users;