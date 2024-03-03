import express, {Express, Request } from 'express';
import cors from 'cors';
import authRouter from './routes/auth.route'
import authenticationToken from './middlewares/auth';
import feedRoute from './routes/feed.route';
import errorHandler from './middlewares/error-Handler';
import followRoute from './routes/follow.route';
import profileRoute from './routes/profile.route';



export const expressApp  = (app: Express) =>{
    app.use(cors({ origin: "*" }));
    app.use(express.json());
    app.use('/api/v1/auth' ,authRouter); 
    app.use("/api/v1/profile",authenticationToken ,profileRoute);
    app.use("/api/v1/feed",authenticationToken, feedRoute);
    app.use("/api/v1/follows", authenticationToken,followRoute);
    
    
    app.use(errorHandler);
}