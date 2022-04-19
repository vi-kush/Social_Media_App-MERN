require('dotenv').config()
const express = require('express');
const app = express();
const path = require('path');

const errorHandler = require('./middleware/error');

const connectDB = require('./config/db')
connectDB();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.static(path.join(__dirname,'build')));

app.use('/api/auth',require('./routes/auth'))
app.use('/api/post',require('./routes/post'))

app.use(errorHandler);

const server = app.listen(PORT, () => console.log(`Server listening on ${PORT}.`));

process.on('unhandledRejection',(err,promise)=>{
    console.log(err);
    server.close(() => {
        console.warn("closed MongoDb connection !!!");
        process.exit(1);
    });
});