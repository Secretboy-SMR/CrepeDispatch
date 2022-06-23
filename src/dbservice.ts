import * as typeorm from "typeorm"
import { AppDataSource } from "./data-source";

import {Accounts} from "./entity/Accounts";



export default class DBService{

    constructor(){}
    
    getAccounts(){
        return AppDataSource.getRepository(Accounts)
    }

    async findAccountByName(name: string){

        return this.getAccounts().findOneBy({
            Username:name
        })



        // return collections.accounts?.findOne({username: name})
    }

    async findAccountById(id:number){
        return this.getAccounts().findOneBy({
            AccountID: id
        })
    }
    async findAccountByToken(token: string){

        //dont use this please
        
        return this.getAccounts().findOneBy({
            Token:token
        })
    }

    async addAccount(account : Accounts){
        this.getAccounts().insert(account)

    }
    
    generateNewToken(){
        //lol
        return "iX83IUoKqll8uwaouASaleG6bJkCLXBk"
    }

    test(){
        let a = new Accounts();
        a.CountryCode = "us";
        a.Email = "lmfao@gmail.com"
        a.Password = "testo";
        a.Username = "testf";
        this.addAccount(a)
        // console.log(collections.accounts)

        setTimeout(async ()=>{
            let b= await this.findAccountByName("testf")
            console.log(JSON.stringify(b))
        }, 1000)
    }
}



 