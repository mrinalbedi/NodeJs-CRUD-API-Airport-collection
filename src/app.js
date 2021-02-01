//IMPORTING THE TOOLS YOU WILL BE USING
import path from 'path';
import express from 'express';
import mongoose from "mongoose";
import bodyParser from 'body-parser';
import airportsRouter, { AIRPORT_PREFIX } from './routes/airports';

mongoose.connect('mongodb://localhost:27017/AirportDepartment');

let app = express();

app.set('views', path.join(path.resolve(), 'src', 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/static', express.static(path.join(path.resolve(), 'src', 'public')));

app.use(AIRPORT_PREFIX, airportsRouter);

export default app;
