import express, { Request, Response } from 'express'
import { Order, OrderStore, addedToOrderProduct } from '../models/order'
// @ts-ignore
import jwt from 'jsonwebtoken';
import verifyAuthToken from '../utilities/verifyAuthToken';

const store = new OrderStore()

const index = async (_req: Request, res: Response) => {
    try{
        const orders = await store.index();
        res.json(orders)
    } catch(err) {
        res.status(400);
        res.json(err) 
       }
}

const show = async (req: Request, res: Response) => {
    try{
        const id: number = parseInt(req.params.id);
        const order = await store.show(id);
        res.json(order)
       } catch(err) {
        res.status(400);
        res.json(err) 
       }
}

const create = async (req: Request, res: Response) => {     
        const order: Order = {
            status: req.body.status,
            user_id: req.body.user_id
        }
    try {
        const newOrder = await store.create(order)
        res.json(newOrder)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

const addProduct = async (req: Request, res: Response) => {
        const add_product: addedToOrderProduct = {
            quantity:  parseInt(req.body.quantity),
            order_id:  req.body.order_id,
            product_id:  req.body.product_id
        }
        
    try {
        const addedProduct = await store.addProduct(add_product);
        res.json(addedProduct);
    } catch(err) {
        res.status(400);
        res.json(err);
    }
}

const showCurrentOrderbyUser = async (req: Request, res: Response) => {
    try{
        const user_id: string = req.params.user_id;
        const order = await store.showCurrentOrderbyUser(user_id);
        res.json(order)
       } catch(err) {
        res.status(400);
        res.json(err) 
       }
}

const orderRoutes = (app: express.Application) => {
  app.get('/orders', verifyAuthToken, index)
  app.get('/orders/:id', verifyAuthToken, show)
  app.post('/orders', verifyAuthToken, create)
  app.post('/orders/addproduct', verifyAuthToken, addProduct)
  app.get('/ordersbyUser/:user_id', verifyAuthToken, showCurrentOrderbyUser)
}

export default orderRoutes