import "reflect-metadata"
import { DataSource } from "typeorm"
import { Accounts } from "./entity/Accounts"

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: String.raw`C:\Users\admin\source\repos\PieSharp\PieSharp\bin\Debug\net6.0\piesharp.db`,
    entities: [Accounts],
})
