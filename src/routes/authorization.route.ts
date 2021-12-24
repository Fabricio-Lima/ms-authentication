import { NextFunction, Response, Request, Router } from 'express';
import JWT from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import basicAuthMiddleware from '../middlewares/basic.auth.middleware';
import ForbiddenError from '../middlewares/forbidden.error.model';

const authorizationRouter = Router();

authorizationRouter.post('/token', basicAuthMiddleware,
async (req: Request, res: Response, next: NextFunction) => {

    try {
        const user = req.user;

        if(!user) throw new ForbiddenError('Usuário não informado');

        const jwtPayload = { username: user.username};
        const jwtOptions = { subject: user?.uuid};
        const secretKey = 'secret';

        const jwt = JWT.sign(jwtPayload, secretKey, jwtOptions);

        res.status(StatusCodes.OK).json({ token: jwt});

    } catch(error){
        next(error);
    }
});

export default authorizationRouter;