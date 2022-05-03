import { ObjectId } from "mongodb";

export default class account {
    public acc_id?: number;
    public playerUid?:string;
    public username?:string;
    public sessionKey?:string;
    public email?:string;
    public token?:string;
    public password?:string;
    public country ?: string;
}