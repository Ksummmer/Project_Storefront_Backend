# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- [GET] '/products', index()
- [GET] '/products/:id', show()
- [POST] '/products', create() [token required]
- [GET] '/products-by-category/:category', productsbyCategory()
- [GET] '/five-most-expensive', fiveMostExpensive()

#### Users
- [GET] '/users', index() [token required]
- [GET] '/users/:id', show() [token required]
- [POST] '/users', create() 
- [POST] '/users/authenticate', authenticate() [token required]

#### Orders
-  [GET] '/orders', index() [token required]
-  [GET] '/orders/:id', show() [token required]
-  [POST] '/orders', create() [token required]
-  [POST] '/orders/addproduct', addProduct() [token required]
-  [GET] '/ordersbyUser/:user_id', showCurrentOrderbyUser() [token required]
- [GET] '/completed-orders-by-user/:user_id' completedOrdersbyUser()

## Data Shapes
#### Product 
-  id
- name
- price
- category

TABLE products includes:
    id SERIAL PRIMARY KEY,
    name VARCHAR(150),
    price integer,
    category VARCHAR 

#### User
- id
- firstName
- lastName
- password

TABLE users includes:
    id SERIAL PRIMARY KEY,
    username VARCHAR(150),
    firstname VARCHAR(150),
    lastname VARCHAR(150),
    password_digest VARCHAR

#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (open or close)

TABLE orders includes:
   id SERIAL PRIMARY KEY,
   status VARCHAR(64),
   user_id bigint REFERENCES users(id)

TABLE order_products includes:
    id SERIAL PRIMARY KEY,
    quantity integer,
    order_id bigint REFERENCES orders(id),
    product_id bigint REFERENCES products(id)

