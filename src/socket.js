import { io } from 'socket.io-client';

export const socket = io(`https://${window.location.hostname}:5000`);

export let socketId;

socket.on('connect', () => {
    socketId = socket.id;
})