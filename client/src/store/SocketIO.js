import openSocket from 'socket.io-client';
import apiURL from '../apis/apiURL';

const socket = openSocket(apiURL);

export default socket;