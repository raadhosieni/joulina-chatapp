import { io } from 'socket.io-client';
import { rootUrl } from './globals';

export const socket = io(rootUrl);
// export const socket = io(`http://${window.location.hostname}:5000`);

export let socketId;

socket.on('connect', () => {
    socketId = socket.id;
})