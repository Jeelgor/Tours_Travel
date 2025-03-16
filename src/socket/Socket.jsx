import { io } from "socket.io-client";
const apiUrl = import.meta.env.VITE_API_URL
const SOCKET_URL = apiUrl;

export const socket = io(SOCKET_URL, {
    withCredentials: true,
    transports: ["websocket"],
});
