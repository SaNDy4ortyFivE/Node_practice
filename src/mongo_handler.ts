import { MongoClient } from "mongodb";
//interface imports
import {iusercollection} from "./intf";

const uri:string = "mongo_uri_string";

const client = new MongoClient(uri);

async function fetchAllDocuments(){
    try {
        await client.connect();
        const database = client.db("MyDB");
        const movies = database.collection<iusercollection>("User");
        const cursor = movies.find<iusercollection>({});
        if ((await cursor.count()) === 0) {
            console.warn("No documents found!");
        }
        await cursor.forEach(console.dir);
    } finally {
        await client.close();
    }
}

async function getUserId(phone:number): Promise<string>{
    var user_id:string = ""; 
    try {
        await client.connect();
        const database = client.db("MyDB");
        const movies = database.collection<iusercollection>("User");
        const user = await movies.findOne<iusercollection>({phone: phone});
        if(user !== null){
            user_id = user.user_id;
        }
    } finally {
        await client.close();
        return user_id;
    }
}

export {fetchAllDocuments, getUserId};
//run().catch(console.dir);