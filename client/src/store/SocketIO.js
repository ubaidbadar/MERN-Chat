import openSocket from 'socket.io-client';
import backendURL from './backendURL';

const socket = openSocket(backendURL);

export default socket;