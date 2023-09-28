import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import dashboardRoutes from './handlers/dashboardRoutes'; 
import orderRoutes from './handlers/orders'; 
import userRoutes from './handlers/users'; 
import productRoutes from './handlers/products'; 

const app: express.Application = express();
const address: string = "http://localhost:3000";
require("dotenv").config();

app.use(bodyParser.json())

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})

//using routes
dashboardRoutes(app);
orderRoutes(app);
userRoutes(app);
productRoutes(app);

app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})


export default app;

