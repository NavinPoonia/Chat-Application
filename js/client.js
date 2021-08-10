const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('message-input');
const messageConatiner = document.querySelector('.container');

var audio = new Audio("ting.mp3");

const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageConatiner.append(messageElement);
    if (position == 'left') {
        audio.play();
    }

}
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append(`you : ${message}`, "right");
    socket.emit('send', message);
    messageInput.value = '';

})
const name1 = prompt('Enter Your Name To Join');
if (name1==null || name1=='') {
    location.reload();
}
socket.emit('new-user-joined', name1);


socket.on('user-joined', name => {
    append(`${name} joined the chat`, "right");
})
socket.on('recieve', message => {
    append(`${message.name}:${message.message}`, "left");
})
socket.on('left', user => {
    append(`${user} left the chat`, "left");
})