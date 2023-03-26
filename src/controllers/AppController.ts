import { Server } from "socket.io";
import { SocketController } from "./SocketController";
import { StoreController } from "./StoreController";

export class AppController {
	private _storeController: StoreController;
	private _socketController;

	constructor(socketServer: Server) {
		this._storeController = StoreController.getInstance();
		this._socketController = new SocketController(socketServer);
		this.init();
	}

	init() {}
}
