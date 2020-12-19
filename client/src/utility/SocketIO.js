import openSocket from 'socket.io-client';
import apiURL from '../apis/apiURL';

export default openSocket(apiURL).io;