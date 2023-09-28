import express, { NextFunction, Request, Response } from 'express';
// @ts-ignore
import jwt from 'jsonwebtoken';


const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorizationHeader = req.headers.authorization
        //@ts-ignore
        const token = authorizationHeader.split(' ')[1]
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET as string)

        next()
    } catch (error) {
        res.status(401);
        res.json('Access denied, invalid token'); 
        return
    }
}


export default verifyAuthToken