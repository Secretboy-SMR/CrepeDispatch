import { ObjectId } from "mongodb";

export default class account {
    public id?: ObjectId;
    public playerUid?:string;
    public username?:string;
    public sessionKey?:string;
    public email?:string;
    public token?:string;
    public password?:string;
    public country ?: string;
}