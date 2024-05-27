import express from 'express';
import morgan from 'morgan';

const app = express();

const PORT = 4000;

const logger = morgan('dev');
app.use(logger);

const globalRouter = express.Router();

const handleHome = (req, res) => res.send('HOME');

globalRouter.get('/', handleHome);

const userRouter = express.Router();

const handleEditUser = (req, res) => {
    res.send('Edit user');
};

userRouter.get('/edit', handleEditUser);

const videoRouter = express.Router();

const handleWatchVideo = (req, res) => res.send('Watch Video!');

videoRouter.get('/watch', handleWatchVideo);

app.use('/', globalRouter);
app.use('/videos', videoRouter);
app.use('/users', userRouter);

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
