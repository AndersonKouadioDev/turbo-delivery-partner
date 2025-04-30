import { io } from 'socket.io-client';

const URL = process.env.NEXT_PUBLIC_SOCKET_HOST ?? "https://socket.turbodeliveryapp.com"//'https://147.79.101.226:3009';

export const socket = io(URL);
