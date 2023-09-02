CREATE TABlE orderItems(
    order_item_id INT PRIMARY KEY IDENTITY(1,1),
    order_id INT NOT NULL,
    book_id INT NOT NULL,
    quantity INT NOT NULL
)