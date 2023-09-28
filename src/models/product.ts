// @ts-ignore
import client from '../database';
import bcrypt from 'bcrypt';

const saltRounds = process.env.SALT_ROUNDS
const pepper = process.env.BCRYPT_PASSWORD

export type Product = {
    id?: number,
    name: string;
    price: Number;
    category: string;
}

export class ProductStore {
    async index(): Promise<Product[]> {
        try {
            // @ts-ignore
            const conn = await client.connect();
            const sql = 'SELECT * FROM products';
            const result = await conn.query(sql);
            
            conn.release();
            
            return result.rows;
        } catch (err) {
            throw new Error(`Cannot get products. Error: ${err}`);
        }
    }

    async show(id: number): Promise<Product> {
        try {   
             // @ts-ignore
            const conn = await client.connect();     

            const sql = 'SELECT * FROM products WHERE id=($1)';

            const result = await conn.query(sql, [id]);

            conn.release();
            
            return result.rows[0];
        } catch (err) {
            throw new Error(`Cannot find product ${id}. Error: ${err}`);
        }
    }

    async create(p: Product): Promise<Product> {
        try {
            // @ts-ignore
            const conn = await client.connect();
            const sql = 'INSERT INTO products (name, price, category) VALUES($1, $2, $3) RETURNING *';

            const result = await conn.query(sql, [p.name, p.price, p.category]);

            const surfboard = result.rows[0];

            conn.release();
            
            return surfboard;
        } catch (err) {
            throw new Error(`Cannot add new product ${p.name}. Error: ${err}`);
        }
    }
}