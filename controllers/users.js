const users = [];

exports.addUser = ({ id, name, room }) => {
    const roomSlug = room.trim().toLowerCase();
    const user = users.find(user => user.id === id);
    if(user){
        return { error: 'Username is taken' };
    }
    const newUser = { id, name, room }
    users.push(newUser);
    return {newUser};
}

exports.removeUser = (id) => {
    const user = users.find(user => user.id === id);
    users.filter(user => user.id !== id);
    return user;
}

exports.getUser = (id) => {
    const user = users.find(user => user.id === id)
    if(user){
        return user;
    }
    else{
        return { error: 'Username does not exist' }
    }
}

exports.getUsersInRoom = (room) => {
    const usersInRoom = users.filter(user => user.room === room);
    return usersInRoom;
}

exports.remainingUsers = (name) => {
    const remains = users.filter(user => user.name !== name);
    return remains;
}