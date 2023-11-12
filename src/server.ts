import express from 'express';
import router from './router';
import morgan from 'morgan';
import cors from 'cors';
import { protect } from './modules/auth';
import { createNewUser, signin } from './handlers/user';

const app = express();

app.use(cors()); // cross origin resource sharing - will tell a browser who or what can access this api
app.use(morgan('dev')); // always put middleware on the top before every other routes
app.use(express.json()); // allows a client to send json, without this we will have to put the bits together by ourselves
app.use(express.urlencoded({ extended: true })); // allows a client to add things like query string, and to be able to manipulate with this

app.get('/', (req, res) => {
    console.log('hello from express');
    res.status(200); 
    res.json({ message: 'hello' });
});

// use is built-in in express, used to apply "global configuraion" to the whole app, or to a certain path
// app.use takes mount path in our case it is /api, and it mounts the router to this path
app.use('/api', protect, router);

app.post('/user', createNewUser);
app.post('/signin', signin);

// error handler must be at the end of all rotue handlers and stuff
app.use((err, req, res, next) => {
    if (err.type === 'auth') {
        res.status(401).json({ message: 'unauthorized' });
    } else if (err.type === 'input') {
        res.status(400).json({ message: 'invalid input' });
    } else {
        res.status(500).json({ message: 'ooops, thats on us' });
    }
})
export default app;

// handlers use next (next()) only when they have to pass down an error
// if you pass anything to next() it treats it like an error