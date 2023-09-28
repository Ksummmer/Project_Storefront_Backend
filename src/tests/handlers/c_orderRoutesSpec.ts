import supertest from 'supertest';
import app from '../../server';
import { Order, OrderStore, addedToOrderProduct} from  '../../models/order';
import express, { Request, Response } from 'express';
import { User } from '../../models/user';
import { Product, ProductStore} from  '../../models/product';

const request = supertest(app);
let token: string;

describe('Using the orderRoutes', () => {
    
  const testUser3: User = {
    id: 3,
    username: 'testUser3',
    firstname: 'Emily',
    lastname: 'Austin',
    password: 'password123'
  }

  const testOrder1: Order = {
    status: 'open',
    user_id: '3'
  }

  const add_product1: addedToOrderProduct = {
    quantity: 1,
    order_id: '1',
    product_id: '1'
  }
  
  beforeAll(async() => {
    const newUser = await request.post('/users').send(testUser3).set('Accept', 'application/json');
    const userReq = await request.post('/users/authenticate').send(testUser3).set('Accept', 'application/json');
    
    token = userReq.body;
  });

  it('Should use CREATE for the endpoint app.post /orders/', async () => {
    const response = await request.post('/orders').send(testOrder1).set(`authorization`, `Bearer ${token}`);
    expect(response.status).toBe(200);
  });

  it('Should use INDEX for the endpoint app.get /orders/', async () => {
    const response = await request.get('/orders').set(`authorization`, `Bearer ${token}`);
    expect(response.status).toBe(200);
  });

  it('Should use SHOW for the endpoint app.get /orders/:id/', async () => {
      const response = await request.get('/orders/1').set(`authorization`, `Bearer ${token}`);
      expect(response.status).toBe(200);
    }); 

    it('Should use ShowCurrentOrderbyUser for the endpoint app.get /ordersbyUser/:user_id/', async () => {
    const response = await request.get('/ordersbyUser/3').set(`authorization`, `Bearer ${token}`);;
    expect(response.status).toBe(200);
  }); 

  it('Should use AddProduct for the endpoint app.post /orders/addproduct', async () => {
    const response = await request.post('/orders/addproduct').send(add_product1).set(`authorization`, `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
   }
)

