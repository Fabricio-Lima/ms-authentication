import express, { Request, Response, NextFunction } from 'express';


const app = express();

app.get('/status', (req: Request, res: Response, next: NextFunction ) => {
    res.status(200).send({ foo: 'bar' });
});

app.listen(3000, () => {
    console.log('\n[+] Server is running on port 3000...\n');
});
