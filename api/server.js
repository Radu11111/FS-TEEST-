console.log("Server-side code running");
const express = require("express");
const mangoose = require("mongoose");
const { MongoClient } = require("mongodb");
const clickData = require("./data/data.json");

const app = express();

// serve files from the public directory
app.use(express.static("public"));

const uri =
  "mongodb+srv://Radu:triplemax2990)@cluster0.bkqz9bj.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri);

async function connect() {
  try {
    await mangoose.connect(uri);
    console.log("connected to MongoDB");
    const colection = client.db().collection("clicks");
    const data_one = clickData[0];
    const data_two = clickData[1];
    const data_three = clickData[2];
    console.log(`succes`);

    const docClick_one = await colection.insertOne(data_one);
    console.log("Doc 1 was inserted!!");
    const docClick_two = await colection.insertOne(data_two);
    console.log("Doc 2 was inserted!!");
    const docClick_three = await colection.insertOne(data_three);
    console.log("Doc 3 was inserted!!");
    const estimate = await colection.estimatedDocumentCount();
    console.log(`In collection clicks estimate/s ${estimate} doc`);
  } 
  catch (error) {
    console.error(error);
  } 
  finally {
    await client.close();
  }
}
connect();

//create a http://localhost:5000/api
app.listen(5000, () => {
  console.log("listening on 5000");
});

// serve the homepage
app.get("/api", (req, res,number) => {
  res.json({clicks:0});
});


//Create a  http://localhost:6000/api/register_click
app.listen(6000, () => {
  console.log("listening on 6000");
});
app.post("/api/register_click", (req, res) => {
  const click = {
    type: "click",
    datetime: "2023-01-01 01:01:01",
  };
  console.log(click);
  console.log(db);

  db.collection("clicks").save(click, (err, result) => {
    if (err) {
      return console.log(err);
    }
    console.log("click added to db");
    res.sendStatus(201);
  });
});
// get the click data from the database
app.get('/api/register_click', (req, res) => {

  db.collection('clicks').find().toArray((err, result) => {
    if (err) return console.log(err);
    res.send(result);
  });
});


