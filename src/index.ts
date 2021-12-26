import express, { urlencoded } from 'express';
import errorHandler from './middlewares/error.handle.middlware';
import jwtAuthenticationMiddleware from './middlewares/jwt.auth.middlware';
import authorizationRouter from './routes/authorization.route';
import statusRoute from './routes/status.route';
import usersRoute from './routes/users.route';

const app = express();

//config api
app.use(express.json());
app.use(urlencoded({ extended: true}));

//routes
app.use(statusRoute);
app.use(authorizationRouter);
app.use(jwtAuthenticationMiddleware);
app.use(usersRoute);

//handling errors
app.use(errorHandler);

//server initialite
app.listen(3000, () => {
    console.log('\n[+] Server is running on port 3000...\n');
});
