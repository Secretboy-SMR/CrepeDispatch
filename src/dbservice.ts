import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";
import { ObjectId } from "mongodb";
import account from "./models/account";

export const collections: { accounts?: mongoDB.Collection<account>} = {}


export default class DBService{
    constructor(public dburl: string, public dbname: string){
        this.connectToDatabase()
    }

    async connectToDatabase () {
        dotenv.config();
     
        const client: mongoDB.MongoClient = new mongoDB.MongoClient(this.dburl);
                
        await client.connect();
            
        const db: mongoDB.Db = client.db(this.dbname);
       
        const accountsCollection: mongoDB.Collection<account> = db.collection<account>("accounts");
     
        collections.accounts = accountsCollection;
           
        console.log(`Successfully connected to database: ${db.databaseName} and collection: ${accountsCollection.collectionName}`);
    }
    async findAccountByName(name: string){
        let accountCursor = collections.accounts?.find({name: name})
        return accountCursor?.limit(1).next();
    }

    async findAccountById(id: string|number){
        let accountCursor = collections.accounts?.find({id: new ObjectId(id)})
        return accountCursor?.limit(1).next();
    }
    async findAccountByToken(token: string){
        let accountCursor = collections.accounts?.find({token: token})
        return accountCursor?.limit(1).next();
    }

    async addAccount(account : account){
        let count = await collections.accounts?.countDocuments();

        account.id = new ObjectId(count||1)
        collections.accounts?.insertOne(account);
    }
    
    generateNewToken(){

    }

    test(){
        let a = new account();
        a.country = "us";
        a.email = "lmfao@gmail.com"
        a.password = "testo";
        a.username = "test";
        this.addAccount(a)


        setInterval(async ()=>{
            let b= await this.findAccountByName("test")
            console.log(JSON.stringify(a))
        }, 1000)
    }
}



 