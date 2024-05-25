// socket.js
import { Server } from 'socket.io';
import http from 'http';

let _io;

export const init = (server) => {
  _io = new Server(server);
  return _io;
};

export const getIO = () => {
  if (!_io) {
    throw new Error('Socket.io not initialized!');
  }
  return _io;
};

