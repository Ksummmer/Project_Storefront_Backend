// @ts-ignore
import client from '../database';
import { Order, OrderStore} from '../models/order';
import { Product, ProductStore} from '../models/product';

export type addedToOrderProduct = {
  id?: number;
  quantity: number;
  order_id: string;
  product_id: string; 
}

export class DashboardQueries {
    // Get completed orders by user
    async completedOrdersbyUser(user_id: number): Promise<Order[]> {
      try {
        //@ts-ignore
        const conn = await client.connect();
        const sql = 'SELECT * FROM orders WHERE user_id = ($1) AND status = ($2)';
  
        const result = await conn.query(sql, [user_id, "close"]);
  
        conn.release();
  
        return result.rows;
      } catch (err) {
        throw new Error(`unable show completed orders for user ${user_id}:${err}`)
      } 
    }

    // Get products by category 
  async productsbyCategory(category: string): Promise<Product[]> {
    try {
      //@ts-ignore
      const conn = await client.connect();
      const sql = 'SELECT * FROM products WHERE category = ($1)';

      const result = await conn.query(sql, [category]);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`unable get products by category ${category}: ${err}`)
    } 
  }

   // Get Top 5 most expensive products 
   async fiveMostExpensive(): Promise<{name: string, price: number}[]> { 
    try { 
        //@ts-ignore 
        const conn = await client.connect();
        const sql = 'SELECT products.name, products.price FROM products ORDER BY price DESC LIMIT 5';
        const result = await conn.query(sql);

        conn.release();
  
        return result.rows;
      } catch (err) {
        throw new Error(`unable get products by price: ${err}`)
      } 
    }
}
   