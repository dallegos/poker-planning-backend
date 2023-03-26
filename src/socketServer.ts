import { Server as SocketIOServer } from "socket.io";
import { IncomingMessage, Server, ServerResponse } from "http";

export function createSocketServer(
	server: Server<typeof IncomingMessage, typeof ServerResponse>
) {
	return new SocketIOServer(server, {
		cors: {
			origin: "http://192.168.100.3:5173",
		},
	});
}
