Udacity Full Stack JavaScript Developer
Storefront Backend Project

Description.

This API is made for  Udacity Full Stack JavaScript Developer Program. This API supports an application - online storefront - which allows users to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page.

API uses the next technologies/packages/dependencies:
- databases /postgres, migrations/
- server /express/
- testing /jasmine, supertest/
- dotenv for env variables
- authorization and jwt /bcrypt, jsonwebtoken/
- docker

 To run the API, you should:
1. install API with npm 'npm install'
2. create .env file:

POSTGRES_HOST=127.0.0.1
POSTGRES_DB=lets_surf
POSTGRES_DB_TEST=lets_surf_test
POSTGRES_USER=surfer
POSTGRES_PASSWORD=password123
ENV=dev
BCRYPT_PASSWORD=my-secret-password
SALT_ROUNDS=10
TOKEN_SECRET=secret

3. create database in the docker container

docker run -d -p 5432:5432 --name lets_surf_db -e POSTGRES_PASSWORD=password123  -e POSTGRES_DB=lets_surf_dev postgres
docker exec -it <container id> bash
psql -U postgres

CREATE DATABASE lets_surf_dev;
CREATE DATABASE lets_surf_test;
CREATE USER surfer WITH PASSWORD 'password123';
\c lets_surf_dev
GRANT ALL PRIVILEGES ON DATABASE lets_surf_dev TO surfer;
\c lets_surf_test
GRANT ALL PRIVILEGES ON DATABASE lets_surf_test TO surfer;

4. run migrations with db-migrate up
5. start with 'npm run start' (the server will listen on port 3000)
6. test with 'npm run test'
7. compile with 'npm run build'
8. test with 'npm run test'
9. use the next endpoints:

* users
- [GET] '/users', index() [token required]
- [GET] '/users/:id', show() [token required]
- [POST] '/users', create() 
- [POST] '/users/authenticate', authenticate() [token required]

* products
- [GET] '/products', index()
- [GET] '/products/:id', show()
- [POST] '/products', create() [token required]

* orders
-  [GET] '/orders', index() [token required]
-  [GET] '/orders/:id', show() [token required]
-  [POST] '/orders', create() [token required]
-  [POST] '/orders/addproduct', addProduct() [token required]
-  [GET] ('/ordersbyUser/:user_id', showCurrentOrderbyUser() [token required]

* dashboard queries
- [GET] '/completed-orders-by-user/:user_id' completedOrdersbyUser()
- [GET] '/products-by-category/:category', productsbyCategory()
- [GET] '/five-most-expensive', fiveMostExpensive()
 

