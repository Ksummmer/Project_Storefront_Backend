import supertest from 'supertest';
import app from '../../server';
import { User, UserStore } from '../../models/user';
import express, { Request, Response } from 'express';


const request = supertest(app);
let token: string;


describe('Using the userRoutes', () => {
    
    const testUser1: User = {
    id: 1,
    username: 'testUser1',
    firstname: 'Daniel',
    lastname: 'Austin',
    password: 'password123'
 }

  // const testUser3: User = {
  //   id: 3,
  //   username: 'testUser3',
  //   firstname: 'Alex',
  //   lastname: 'Austin',
  //   password: 'password123'
  // }
  

  it('Should use CREATE for the endpoint app.post /users/', async () => {
        const response = await request.post('/users').send(testUser1);
        expect(response.status).toBe(200);
      });
      
  it('Should use INDEX for the endpoint app.get /users/', async () => {
    
    //const newUser = await request.post('/users').send(testUser3).set('Accept', 'application/json');
    const userReq = await request.post('/users/authenticate').send(testUser1).set('Accept', 'application/json');
    
    token = userReq.body;

      const response = await request.get('/users').set(`authorization`, `Bearer ${token}`);
      expect(response.status).toBe(200);
    });

    it('Should use SHOW for the endpoint app.get /users/', async () => {
        const response = await request.get('/users/1').set(`authorization`, `Bearer ${token}`);;
        expect(response.status).toBe(200);
      }); 
  }
)