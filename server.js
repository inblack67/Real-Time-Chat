const express = require('express');
require('colors');
const socketio = require('socket.io');

const app = express();

const index = require('./routes/index');

app.use('/api', index);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`.green.bold);
})

const io = socketio(server);

io.on('connect', socket => {
    console.log(`Socket server is up`.blue.bold);

    socket.on('join', (data, cb) => {
        console.log(data)
        const error = true;
        if(error){
            cb({ error: 'ERROR!' });
        }
    })
})

io.on('disconnect', socket => {
    console.log(`User has left, socket is disconnected`.red.bold);
})

