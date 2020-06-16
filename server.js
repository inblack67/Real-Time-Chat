const express = require('express');
require('colors');
const socketio = require('socket.io');
const { addUser, removeUser, getUser, getUsersInRoom, remainingUsers } = require('./controllers/users');

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
        const { name, room } = data;
        const res = addUser({ id: socket.id, name, room });

        const { newUser, error } = res;

        if(error){
            return cb(error);
        }

        socket.emit('notification', { user: 'admin', payload: `Welcome ${newUser.name}. Enjoy spamming ${newUser.room} room` });

        socket.broadcast.to(newUser.room).emit('notification', { user: 'admin', payload: `${newUser.name} has joined.` });

        socket.join(newUser.room);

        const usersInRoom = getUsersInRoom(newUser.room, socket.id);

        io.to(newUser.room).emit('roomData', { room: newUser.room, usersInRoom })
    })

    socket.on('sendMessage', message => {

        const user = getUser(socket.id);
        
        io.to(user.room).emit('message', { user: user.name, payload: message });

    })

    socket.on('disconnect', () => {
        const user = removeUser(socket.id);
    
        if(user) {

          io.to(user.room).emit('notification', { user: 'Admin', payload: `${user.name} has left` });

          const usersInRoom = remainingUsers(user.name) 
          
          io.to(user.room).emit('roomData', { room: user.room, usersInRoom });
        }
      })

})


