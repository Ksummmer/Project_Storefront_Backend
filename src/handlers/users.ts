import express, { Request, Response } from 'express'
import { User, UserStore } from '../models/user'
// @ts-ignore
import bcrypt from 'bcrypt';
// @ts-ignore
import jwt from 'jsonwebtoken';
import { NextFunction } from 'express';
import verifyAuthToken from '../utilities/verifyAuthToken';


const store = new UserStore()

const index = async (_req: Request, res: Response) => {
    try{
        const users = await store.index();
         res.json(users)
        } catch(err) {
            res.status(400);
            res.json(err) 
           }
        }


const show = async (req: Request, res: Response) => {
    try{
        const id: number = parseInt(req.params.id);
        const user = await store.show(id);
        res.json(user)
       } catch(err) {
        res.status(400);
        res.json(err) 
       }
}

const create = async (_req: Request, res: Response) => {
    try{
        const user: User = {
        username: _req.body.username,
        firstname: _req.body.firstname,
        lastname: _req.body.lastname,
        password: _req.body.password,
     }
     const newUser = await store.create(user);
     //const token = jwt.sign({ user: newUser}, process.env.TOKEN_SECRET as string);
     res.json(newUser)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

const authenticate = async (_req: Request, res: Response) => {
    const user: User = {
      username: _req.body.username,
      firstname: '',
      lastname: '',
      password: _req.body.password,
    }
    try {
        const u = await store.authenticate(user.username, user.password)
        //add token
        const token = jwt.sign({ user: u }, process.env.TOKEN_SECRET as string);
        res.json(token)
    } catch(err) {
        res.status(401)
        //@ts-ignore
        res.json(`${Error}`)
    }
  }


const userRoutes = (app: express.Application) => {
  app.get('/users', verifyAuthToken, index)
  app.get('/users/:id', verifyAuthToken, show)
  app.post('/users', create)
  app.post('/users/authenticate', authenticate)
}

export default userRoutes