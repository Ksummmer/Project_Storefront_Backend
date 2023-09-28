// @ts-ignore
import client from '../database';

export type Order = {
    id?: number;
    status: string;
    user_id: string;
}

export type addedToOrderProduct = {
    id?: number;
    quantity: number;
    order_id: string;
    product_id: string; 
}

export class OrderStore {
    async index(): Promise<Order[]> {
        try {
            // @ts-ignore
            const conn = await client.connect();
            const sql = 'SELECT * FROM orders';
            const result = await conn.query(sql);

            conn.release();
            
            return result.rows;
        } catch (err) {
            throw new Error(`Cannot get orders. Error: ${err}`);
        }
    }

    async show(id: number): Promise<Order> {
        try {
              // @ts-ignore
            const conn = await client.connect();

            const sql = 'SELECT * FROM orders WHERE id=($1)';

            const result = await conn.query(sql, [id]);

            conn.release();
            
            return result.rows[0];
        } catch (err) {
            throw new Error(`Cannot find order ${id}. Error: ${err}`);
        }
    }

    async create(o: Order): Promise<Order> {
        try {  
            // @ts-ignore
            const conn = await client.connect();
            const sql = 'INSERT INTO orders (status, user_id) VALUES($1, $2) RETURNING *';
            
            const result = await conn.query(sql, [o.status, o.user_id]);

            const order = result.rows[0];

            conn.release();
            
            return order;
        } catch (err) {
            throw new Error(`Cannot add new order ${o}. Error: ${err}`);
        }
    }


    async addProduct(add_product: addedToOrderProduct): Promise<addedToOrderProduct> {
        
        try {
            // @ts-ignore
            const conn = await client.connect();
            
            const ordersql = 'SELECT * FROM orders WHERE id=($1)';
            
            const result = await conn.query(ordersql, [add_product.order_id]);
            const order = result.rows[0];

            if(order.status !== "open") {
                throw new Error(`Cannot add product ${add_product.product_id} to order ${add_product.order_id} because order status is ${order.status}`);
            }
            conn.release();
        } catch (err) {
            throw new Error(`${err}`);
            console.log('error in model');
            console.log(err);
        }
        
        try {
            // @ts-ignore
            const conn = await client.connect();
            const sql = 'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *';
        
            const result = await conn.query(sql, [add_product.quantity, add_product.order_id, add_product.product_id]);
            
            const order = result.rows[0];
            
            conn.release();
            
            return order;
            } catch (err) {
                throw new Error(`Cannot add product ${add_product.product_id} to order ${add_product.order_id}. Error: ${err}`);
            }
        }


        
    async showCurrentOrderbyUser(user_id: string): Promise<Order> {
        try {
          //@ts-ignore
          const conn = await client.connect();
          const sql = 'SELECT * FROM orders WHERE user_id = ($1)'
    
          const result = await conn.query(sql, [user_id]);
    
          conn.release();
    
          return result.rows[0];
        } catch (err) {
          throw new Error(`unable show orders for user ${user_id}`)
        } 
      }
}


