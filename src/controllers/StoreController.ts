import { Store, User, Vote } from "../models";

export class StoreController {
	private static instance: StoreController;
	private _store: Store = { users: [], votes: [] };

	private constructor() {}

	/**
	 *
	 * @returns
	 */
	public static getInstance(): StoreController {
		if (!StoreController.instance) {
			StoreController.instance = new StoreController();
		}

		return StoreController.instance;
	}

	/**
	 *
	 * @param key
	 * @returns
	 */
	public getStoreByKey(key: keyof Store): User[] | Vote[] | undefined {
		return this._store[key];
	}

	/**
	 *
	 * @param key
	 * @param value
	 */
	public addValueToStore(key: keyof Store, value: any): void {
		this._store[key]?.push(value);
	}

	/**
	 *
	 * @param key
	 * @param value
	 */
	public resetStore(key: keyof Store): void {
		this._store[key] = [];
	}

	/**
	 *
	 * @param key
	 * @param value
	 */
	public replaceValueInStore(
		key: keyof Store,
		index: number,
		value: any
	): void {
		this._store[key]![index] = value;
	}

	/**
	 *
	 * @param key
	 * @param value
	 * @returns
	 */
	public removeValueFromStore(
		key: keyof Store,
		value: User
	): User[] | Vote[] | undefined {
		if (!this._store || !this._store[key]) return;

		const index = this._store[key]?.findIndex(
			(u) => JSON.stringify(u) === JSON.stringify(value)
		);

		if (typeof index === "number" && index >= 0) {
			this._store[key]?.splice(index, 1);
		}

		return this._store[key];
	}
}
