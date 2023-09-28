import supertest from 'supertest';
import app from '../../server';
import express, { Request, Response } from 'express';
import { User } from '../../models/user';
import { DashboardQueries, addedToOrderProduct } from '../../services/dashboard';

const request = supertest(app);
let token: string;


describe('Using the dashboardRoutes', () => {
    
  const testUser5: User = {
    id: 5,
    username: 'testUser5',
    firstname: 'Alex',
    lastname: 'Austin',
    password: 'password123'
  }

  const add_product1: addedToOrderProduct = {
    quantity: 1,
    order_id: '1',
    product_id: '1'
  }
  
  beforeAll(async() => {
    const newUser = await request.post('/users').send(testUser5).set('Accept', 'application/json');
    const userReq = await request.post('/users/authenticate').send(testUser5).set('Accept', 'application/json');
    
    token = userReq.body;
  });

  it('Should use completedOrdersbyUser for the endpoint app.get /completed-orders-by-user/', async () => {
    const response = await request.get('/completed-orders-by-user/2').set(`authorization`, `Bearer ${token}`);;
    expect(response.status).toBe(200);
  });

  it('Should use productsbyCategory for the endpoint app.get /orders/', async () => {
    const response = await request.get('/products-by-category/:category');
    expect(response.status).toBe(200);
  });

  it('Should use fiveMostExpensive for the endpoint app.get //five-most-expensive/', async () => {
      const response = await request.get('/five-most-expensive');
      expect(response.status).toBe(200);
    }); 
  }
)

