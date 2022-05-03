import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";
import { ObjectId } from "mongodb";
import account from "./models/account";

export const collections: { accounts?: mongoDB.Collection<account>} = {}


export default class DBService{
    constructor(public dburl: string, public dbname: string){
        
    }

    async connectToDatabase () {
        dotenv.config();
     
        const client: mongoDB.MongoClient = new mongoDB.MongoClient(this.dburl);
                
        await client.connect();
            
        const db: mongoDB.Db = client.db(this.dbname);
       
        const accountsCollection: mongoDB.Collection<account> = db.collection<account>("accounts");
        // console.log(accountsCollection)
        collections.accounts = accountsCollection;
           
        console.log(`Successfully connected to database: ${db.databaseName} and collection: ${accountsCollection.collectionName}`);
    }
    async findAccountByName(name: string){

        let accountCursor = collections.accounts?.find({username: name})
        return accountCursor?.limit(1).next();

        // return collections.accounts?.findOne({username: name})
    }

    async findAccountById(id: string|number){
        let accountCursor = collections.accounts?.find({acc_id: id.toString()})
        return accountCursor?.limit(1).next();
    }
    async findAccountByToken(token: string){

        //dont use this please
        
        let accountCursor = collections.accounts?.find({token: token})
        return accountCursor?.limit(1).next();
    }

    async addAccount(account : account){
        let count = await collections.accounts?.countDocuments();

        // account.id = new ObjectId(count||1)
        collections.accounts?.insertOne(account);
    }
    
    generateNewToken(){
        //lol
        return "iX83IUoKqll8uwaouASaleG6bJkCLXBk"
    }

    test(){
        let a = new account();
        a.country = "us";
        a.email = "lmfao@gmail.com"
        a.password = "testo";
        a.username = "testf";
        this.addAccount(a)
        // console.log(collections.accounts)

        setTimeout(async ()=>{
            let b= await this.findAccountByName("testf")
            console.log(JSON.stringify(b))
        }, 1000)
    }
}



 