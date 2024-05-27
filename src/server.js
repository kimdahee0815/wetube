import express from 'express';
import morgan from 'morgan';

const app = express();

const PORT = 4000;

const logger = morgan('dev');
app.use(logger);

const globalRouter = express.Router();
const userRouter = express.Router();
const videoRouter = express.Router();

app.use('/', globalRouter);
app.use('/videos', videoRouter);
app.use('/users', userRouter);

const handleHome = (req, res) => {
    console.log(`Somebody is trying to go :${req.url}!`);
    return res.send('<h1>i STILL LOVE YOU</h1>');
};
const handleLogin = (req, res) => {
    return res.send({ message: 'login here' });
};

// const handleProtected = (req, res, next) => {
//     return res.send('welcome to the private lounge.');
// };

app.get('/', handleHome);

app.get('/login', handleLogin);

const handleListening = () => console.log(`Server Listening on port http://localhost:${PORT} 👌`);

app.listen(PORT, handleListening);
