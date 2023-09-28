import express, { NextFunction, Request, Response } from 'express'
import { Product, ProductStore } from '../models/product'
// @ts-ignore
import jwt from 'jsonwebtoken';
import verifyAuthToken from '../utilities/verifyAuthToken';


const store = new ProductStore()


const index = async (_req: Request, res: Response) => {
    try{
        const products = await store.index();
         res.json(products)
        } catch(err) {
            res.status(400);
            res.json(err) 
           }
        }

const show = async (req: Request, res: Response) => {
   try{
    const id: number = parseInt(req.params.id);
    const product = await store.show(id);
    res.json(product)
   } catch(err) {
    res.status(400);
    res.json(err) 
   }
}

const create = async (req: Request, res: Response) => {
    
    const product: Product = {
        name: req.body.name,
        price: req.body.price,
        category: req.body.category
    }
    
    try {
        const newProduct = await store.create(product);
        res.json(newProduct);
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}


const productRoutes = (app: express.Application) => {
  app.get('/products', index)
  app.get('/products/:id', show)
  app.post('/products', verifyAuthToken, create)
}

export default productRoutes 