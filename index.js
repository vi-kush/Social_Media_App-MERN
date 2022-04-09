const express = require('express');
const app = express();
const path = require('path');

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname,'build')));

const server = app.listen(PORT, () => console.log(`Server listening on ${PORT}.`));

process.on('unhandledRejection',(err,promise)=>{
    console.log(err);
    server.close(() => {
        console.warn("closed MongoDb connection !!!");
        process.exit(1);
    });
});