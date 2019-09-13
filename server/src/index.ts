import express from 'express';

const app = express();

const PORT = 3000;

app.get('/', (_, res) => {
    res.send({
        message: 'Hello World!',
    });
});

app.listen(PORT, () => {
    console.log('Server started successfully on port ' + PORT);
});
