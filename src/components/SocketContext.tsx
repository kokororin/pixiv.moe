import { createContext } from 'react';
import { io, Socket } from 'socket.io-client';
import * as config from '../config';

export const socket = io(config.socketURL);
export const SocketContext = createContext<Socket>({} as Socket);
