import { io, Socket } from "socket.io-client";
const apiUrl = import.meta.env.VITE_API_BASE_URL_SOCKET;

interface ServerToClientEvents {
  voteUpdated: (data: { message: string }) => void;
}

const socket: Socket<ServerToClientEvents> = io(apiUrl);

export default socket;
