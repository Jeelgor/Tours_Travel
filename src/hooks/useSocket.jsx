import { useEffect, useState } from "react";
import { io } from "socket.io-client";
const apiUrl = import.meta.env.VITE_API_URL;
const SOCKET_URL = apiUrl;

export default function useSocket() {
    const [socket, setSocket] = useState(null);
    const [Seatleft, setSeatleft] = useState({});

    useEffect(() => {
        const newSocket = io(SOCKET_URL, { withCredentials: true });

        newSocket.on("connect", () => {
            console.log("Connected to WebSocket:", newSocket.id);
        });

        newSocket.on("updateSeats", (data) => {
            setSeatleft((prev) => ({ ...prev, [data._id]: data.Seatleft }));
        });

        setSocket(newSocket);

        return () => newSocket.disconnect();
    }, []);

    return { socket, Seatleft };
}
