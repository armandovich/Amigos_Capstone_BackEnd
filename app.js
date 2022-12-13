import {} from 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'
import fileUpload from 'express-fileupload'
import cors from 'cors'
import bodyParser from  'body-parser'
import morgan from 'morgan'
import _ from 'lodash'
import routes from './routes/routes.js'

const mongoString = process.env.DATABASE_URL;

mongoose.connect(mongoString);

const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})
const app = express();

app.use(fileUpload({ createParentPath: true }));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));
//app.use(express.json());

app.use(express.static('public')); 
app.use('/uploads', express.static('images'));

app.use('/api', routes)

app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})