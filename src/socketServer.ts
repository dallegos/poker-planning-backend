import { Server as SocketIOServer } from "socket.io";
import { IncomingMessage, Server, ServerResponse } from "http";

export function createSocketServer(
	server: Server<typeof IncomingMessage, typeof ServerResponse>
) {
	return new SocketIOServer(server);
}
