const express = require("express");
const cors=require('cors');
const { MongoClient, ServerApiVersion } = require("mongodb");
require('dotenv').config();
const app = express();


const port=process.env.PORT||5000

// middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.db_user}:${process.env.db_password}@cluster0.iuxnrsy.mongodb.net/?retryWrites=true&w=majority`;                                                  
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
async function run(){
    try{
        await client.connect();
        const database = client.db("doctors_database");
        const ServiceCollection = database.collection("services");
        app.get('/service',async(req,res)=>{
            const query={};
            const cursor=ServiceCollection.find(query);
            const services=await cursor.toArray();
            res.send(services);
        })

    }
    finally{

    }
}
run().catch(console.dir);


// client.connect((err) => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });


// respond with "hello world" when a GET request is made to the homepage
app.get("/", (req, res) => {
  res.send("hello world");
});
app.listen(port,()=>{
    console.log('doctor uncle sorry',port);
})
