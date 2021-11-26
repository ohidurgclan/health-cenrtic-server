const { MongoClient } = require('mongodb');
const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 4030;

//Middle Ware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mvbo5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();

        const database = client.db('health_centric');
        const doctorCollection = database.collection('doctors');
        const serviceCollection = database.collection('services');

        // Get Doctors API
        app.get('/doctors', async (req, res) => {
            const cursor = doctorCollection.find({});
            const doctors = await cursor.toArray();
            res.send(doctors);
        });
        // Get Services API
        app.get("/services", async (req, res) => {
        const cursor = serviceCollection.find({});
        const services = await cursor.toArray();
        res.send(services);
        });
    }
    finally {
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {    
    res.send('Health Centric Server Running');
});
app.listen(port, () => {
    console.log('Running Health Centric Server on', port);
})