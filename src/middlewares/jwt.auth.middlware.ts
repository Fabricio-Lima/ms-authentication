import { NextFunction, Request, Response } from "express";
import ForbiddenError from "./forbidden.error.model";
import JWT from 'jsonwebtoken';


const jwtAuthenticationMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorizationHeader = req.headers['authorization']; 
        if (!authorizationHeader){
            throw new ForbiddenError('Credenciais não informadas');
        }

        const [authorizationType, token] = authorizationHeader.split(' ');
        if(authorizationType !== 'Bearer' || !token) {
            throw new ForbiddenError('Tipo de autenticação inválida');
        }

        try {
            const tokenPayload = JWT.verify(token, 'secret');
            if(typeof tokenPayload !== 'object' || !tokenPayload.sub){
                throw new ForbiddenError('Token inválido');
            }

            const user = {
                uuid: tokenPayload.sub,
                username: tokenPayload.username
            }

            req.user = user;
            next();
        } catch(error){
            throw new ForbiddenError('Token inválido');
        }

    } catch(error) {
        next(error);
    };
}

export default jwtAuthenticationMiddleware;