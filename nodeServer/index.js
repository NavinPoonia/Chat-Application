// Node server which will handle socket io connections
const io = require("socket.io")(8000)
const users = {};

io.on('connection', socket => {
    // if any new user joins,let other user users know who joined the chat.
    socket.on('new-user-joined', name => {
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name)
    });
    // if someone sends a message ,broadcast it to other users.
    socket.on('send', message => {
        socket.broadcast.emit('recieve', { message: message, name: users[socket.id] })
    });
    // if someone leaves the chat, broadcast it to other users
    // disconnect is a bulit-in event
    socket.on('disconnect', message => {
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });
})

