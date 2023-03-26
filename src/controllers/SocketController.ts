import { Server, Socket } from "socket.io";
import { EVENTS, User, Vote } from "../models";
import { StoreController } from "./StoreController";

export class SocketController {
	private _socketServer: Server;
	private _socket: Socket | null = null;
	private _store = StoreController.getInstance();
	private _isConnected: boolean = false;

	constructor(socketServer: Server) {
		this._socketServer = socketServer;
		this.init();
	}

	init() {
		this._socketServer.on("connection", (socket) => {
			this._isConnected = true;
			this._socket = socket;

			socket.on(EVENTS.CHAT_MESSAGE, (message: string) => {
				this._socketServer.emit(EVENTS.CHAT_MESSAGE, message);
			});

			socket.on(EVENTS.REGISTER_USER, (user: User, users: User[]) => {
				if (user) this._store.addValueToStore("users", user);

				this._socketServer.emit(
					EVENTS.REGISTER_USER,
					user,
					this._store.getStoreByKey("users")
				);

				/* this._store.getStoreByKey("users")?.forEach((u) => {
					
				}); */
			});

			socket.on(EVENTS.RESET_VOTES, () => {
				this._store.resetStore("votes");
				this._socketServer.emit(EVENTS.USER_VOTED, null, []);
				this._socketServer.emit(EVENTS.RESET_VOTES);
			});

			socket.on(EVENTS.SHOW_VOTES, () => {
				this._socketServer.emit(EVENTS.SHOW_VOTES);
			});

			socket.on(EVENTS.USER_VOTED, (vote: Vote) => {
				const votes = this._store.getStoreByKey("votes") as Vote[];

				if (votes) {
					const index = votes.findIndex(
						(v) => v.user.id === vote.user.id
					);

					if (index > -1) {
						this._store.replaceValueInStore("votes", index, vote);
					} else {
						this._store.addValueToStore("votes", vote);
					}
				}

				this._socketServer.emit(
					EVENTS.USER_VOTED,
					vote,
					this._store.getStoreByKey("votes")
				);
			});

			socket.on("disconnect", (reason: any) => {
				const users = this._store.getStoreByKey("users") as User[];

				const user = users.find(
					(user) => user.currentSocketId === socket.id
				);

				if (user) {
					const retorno = this._store.removeValueFromStore(
						"users",
						user
					);

					this._socketServer.emit(
						EVENTS.REGISTER_USER,
						null,
						retorno
					);
				}

				if (users.length === 0) {
					this._store.resetStore("users");
					this._store.resetStore("votes");
				}

				users.forEach((u) => {});
			});
		});
	}

	/**
	 *
	 */
	private _checkIfSomeoneOnline() {}
}
