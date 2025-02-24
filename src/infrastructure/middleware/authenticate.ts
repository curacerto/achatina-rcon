import {Injectable, NestMiddleware} from '@nestjs/common';
import {Request, Response, NextFunction} from 'express';

@Injectable()
export class AuthenticateMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const apiKey = req.headers['x-api-key'];
        const validApiKey = process.env.VALID_API_KEY; // Store your valid API key in environment variables

        if (apiKey === validApiKey) {
            next();
        } else {
            res.status(403).json({message: 'Forbidden'});
        }
    }
}