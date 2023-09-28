// @ts-ignore
import client from '../database';
// @ts-ignore
import bcrypt from 'bcrypt';

const saltRounds = process.env.SALT_ROUNDS as string;
const pepper = process.env.BCRYPT_PASSWORD as string;


export type User = {
    id?: number,
    username: string,
    firstname: string,
    lastname: string,
    password: string
}

export class UserStore {
    async index(): Promise<User[]> {
        try {
            // @ts-ignore
            const conn = await client.connect();
            const sql = 'SELECT * FROM users';
            const result = await conn.query(sql);

            conn.release();
            
            return result.rows;
        } catch (err) {
            throw new Error(`Cannot get user. Error: ${err}`);
        }
    }

    async show(id: number): Promise<User> {
        try {
             // @ts-ignore
            const conn = await client.connect();
            const sql = 'SELECT * FROM users WHERE id=($1)';

            const result = await conn.query(sql, [id]);

            conn.release();
            
            return result.rows[0];
        } catch (err) {
            throw new Error(`Cannot find user ${id}. Error: ${err}`);
        }
    }

    async create(u: User): Promise<User> {
        try {
            // @ts-ignore
            const conn = await client.connect();
            const sql = 'INSERT INTO users (username, firstname, lastname, password_digest) VALUES($1, $2, $3, $4) RETURNING *';

            const hash =bcrypt.hashSync(
                u.password + pepper,
                // @ts-ignore
                parseInt(saltRounds)
            );

            const result = await conn.query(sql, [u.username, u.firstname, u.lastname, /*u.password*/ hash]);
            const user = result.rows[0];
            conn.release();

            return user;
        } catch (err) {
            throw new Error(`Couldn't create user (${u.username}). Error: ${err}`);
        }
    }

    async authenticate(username: string, password: string): Promise<User | string> {
        try{ 
        //@ts-ignore
        const conn = await client.connect();
        const sql = 'SELECT password_digest FROM users WHERE username=($1)';

        const result = await conn.query(sql, [username]);

        conn.release();

     if(result.rows.length) {
            const user = result.rows[0];

            if(bcrypt.compareSync(password+pepper, user.password_digest)) {
                console.log('Welcome');
                return user;
            } else {
                console.log('Wrong password');
                return 'Wrong password';
            }
          } else {
              throw new Error(`Error: couldn't find user ${username}`);
          } 
    } catch (err) {
         throw new Error(`${Error}`);
    }
  }
}
