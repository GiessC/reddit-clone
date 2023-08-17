import express, { Express } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes';
import bodyParser from 'body-parser';

const app: Express = express();

dotenv.config();

const PORT: string | number = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());
app.use(routes);

const uri: string = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@redditclonecluster.no6tx8b.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`

mongoose
    .connect(uri)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`)
        })
    })
    .catch((error) => {
        throw error;
    });