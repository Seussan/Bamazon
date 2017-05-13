CREATE DATABASE Bamazon_DB;

USE Bamazon_DB;

CREATE TABLE products(
  item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(50) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INTEGER(10) NOT NULL,
  PRIMARY KEY (item_id)
);

-- Create Data
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Nest Outdoor Security Camera", "Electronics", 170.00, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Philips Hue White A19 Starter Kit with two LED light bulbs and bridge", "Electronics", 69.99, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Netgear Orbi Home Wi-Fi System", "Computers & Accessories", 378.88, 16);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Razer Black Widow Chroma V2, Clicky RGB Mechanical Gaming Keyboard", "Computers & Accessories", 163.98, 6);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("CHI Original Pro 1-inch Ceramic Ionic Flatiron", "Beauty & Health", 89.95, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Revlon One Step Hair Dryer and Volumnizer", "Beauty & Health", 59.99, 25);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Ginny Moon by Benjamin Ludwig", "Books & Audible", 17.66, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Astrophysics for People in a Hurry", "Books & Audible", 11.37, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("20th Century Women [Blu-ray]", "Movies, Music & Games", 14.99, 7);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("A Dog's Purpose", "Movies, Music & Games", 17.96, 2);

-- SELECT `products`.`item_id`,
--     `products`.`product_name`,
--     `products`.`department_name`,
--     `products`.`price`,
--     `products`.`stock_quantity`
-- FROM `bamazon`.`products`;

-- INSERT INTO `bamazon`.`products`
-- (`item_id`,
-- `product_name`,
-- `department_name`,
-- `price`,
-- `stock_quantity`)
-- VALUES
-- (<{item_id: }>,
-- <{product_name: }>,
-- <{department_name: }>,
-- <{price: }>,
-- <{stock_quantity: }>);

-- UPDATE `bamazon`.`products`
-- SET
-- `item_id` = <{item_id: }>,
-- `product_name` = <{product_name: }>,
-- `department_name` = <{department_name: }>,
-- `price` = <{price: }>,
-- `stock_quantity` = <{stock_quantity: }>
-- WHERE `item_id` = <{expr}>;