import { io } from 'socket.io-client';
import { rootUrl } from './globals';

export const socket = io(rootUrl);

export let socketId;

socket.on('connect', () => {
    socketId = socket.id;
})