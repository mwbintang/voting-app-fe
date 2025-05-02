import { io, Socket } from "socket.io-client";
import { VoteOption } from "./types";
const apiUrl = import.meta.env.VITE_API_BASE_URL_SOCKET;

interface ServerToClientEvents {
  voteUpdated: (data: { message: string, candidate: VoteOption[] }) => void;
}

const socket: Socket<ServerToClientEvents> = io(apiUrl);

export default socket;
