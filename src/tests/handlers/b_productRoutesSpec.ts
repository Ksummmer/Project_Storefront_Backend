import supertest from 'supertest';
import app from '../../server';
import { Product, ProductStore } from '../../models/product';
import express, { Request, Response } from 'express';
import { User } from '../../models/user';

const request = supertest(app);
let token: string;


describe('Using the productRoutes', () => {
    
  const testUser2: User = {
    id: 2,
    username: 'testUser2',
    firstname: 'Steffi',
    lastname: 'Austin',
    password: 'password123'
  }
  
  const testproduct1: Product = {
    name: 'Surfboard Hawaii',
    price: 350,
    category: 'longboards'
    }

  
  beforeAll(async() => {
    const newUser = await request.post('/users').send(testUser2).set('Accept', 'application/json');
    const userReq = await request.post('/users/authenticate').send(testUser2).set('Accept', 'application/json');
    
    token = userReq.body;
  })

  it('Should use CREATE for the endpoint app.post /productRoutes/', async () => {
        const response = await request.post('/products').send(testproduct1).set(`authorization`, `Bearer ${token}`);
        expect(response.status).toBe(200);
      });
      
  it('Should use INDEX for the endpoint app.get /productRoutes/', async () => {
      const response = await request.get('/products');
      expect(response.status).toBe(200);
    });

    it('Should use SHOW for the endpoint app.get /productRoutes/', async () => {
        const response = await request.get('/products/1');
        expect(response.status).toBe(200);
      }); 
  }
)