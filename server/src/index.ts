import express, {Application} from 'express';
import mongoose from 'mongoose';
require('dotenv/config');
import bodyParser from 'body-parser';

const PORT = process.env.PORT || 3000;

const app: Application = express();

app.use(bodyParser.json());

//import routes
const mathRoutes = require('./routes/math');
app.use('/math',mathRoutes);

//Connect to db
// @ts-ignore
mongoose.connect(String(process.env.DB_CONNECTION),
  { useNewUrlParser: true },
  ()=> {console.log('connected to DB')});

app.listen(PORT, () => {
    console.log('Server started successfully on port ' + PORT);
});
