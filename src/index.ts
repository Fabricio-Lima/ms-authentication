import express, { urlencoded } from 'express';
import statusRoute from './routes/status.route';
import usersRoute from './routes/users.route';


const app = express();

//config api
app.use(express.json());
app.use(urlencoded({ extended: true}));

//routes
app.use(statusRoute);
app.use(usersRoute);

//server initialite
app.listen(3000, () => {
    console.log('\n[+] Server is running on port 3000...\n');
});
