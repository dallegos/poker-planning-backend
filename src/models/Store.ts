//type StoreType = "users" | "rooms" | "messages" | "votes";
/* 
enum StoreType {
    USERS = User[]
}


export interface Store {
    [key in typeof StoreType]: 
} */

import { User } from "./User";
import { Vote } from "./Vote";

export interface Store {
	users?: User[];
	votes?: Vote[];
}
