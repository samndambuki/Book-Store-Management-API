CREATE TABLE orders(
    order_id INT PRIMARY KEY IDENTITY(1,1),
    customer_id INT NOT NULL,
    order_date TIMESTAMP
)