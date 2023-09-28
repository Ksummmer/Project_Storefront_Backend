import express, { Request, Response } from 'express';
import { DashboardQueries, addedToOrderProduct } from '../services/dashboard';
import { Product, ProductStore } from '../models/product'
// @ts-ignore
import jwt from 'jsonwebtoken';
import verifyAuthToken from '../utilities/verifyAuthToken';


const dashboard = new DashboardQueries()

const completedOrdersbyUser = async (req: Request, res: Response) => {
  const user_id: number = parseInt(req.params.user_id);
  const orders = await dashboard.completedOrdersbyUser(user_id).catch((err) => {
    console.error(err);
    res.send(`Mistake: ${err}`);
    return;
  });
  res.json(orders)
}

const productsbyCategory = async (req: Request, res: Response) => {
  const category: string = req.params.category;
  const products = await dashboard.productsbyCategory(category).catch((err) => {
    console.error(err);
    res.send(`Mistake: ${err}`);
    return;
  });
  res.json(products)
}

const fiveMostExpensive = async (_req: Request, res: Response) => {
    const products = await dashboard.fiveMostExpensive().catch((err) => {
      console.error(err);
      res.send(`Mistake: ${err}`);
      return;
    });
    res.json(products)
  }

const dashboardRoutes = (app: express.Application) => {
    app.get('/completed-orders-by-user/:user_id', verifyAuthToken, completedOrdersbyUser)
    app.get('/products-by-category/:category', productsbyCategory)
    app.get('/five-most-expensive', fiveMostExpensive)
}

export default dashboardRoutes