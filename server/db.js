const { MongoClient, ServerApiVersion, Collection } = require("mongodb");

const DB_USER = "namastenodeskd";
const DB_PASS = "f4rUlxnLmZK4sVaL";
const DB_NAME = "HelloWorld";
const connectionString = `mongodb+srv://${DB_USER}:${DB_PASS}@namastenodeskd.xjwy5.mongodb.net/?retryWrites=true&w=majority&appName=NamasteNodeSkd`;

async function connectDB() {
  const client = new MongoClient(connectionString, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });
  await client.connect();
  console.log("Connected to DB server");
  const db = client.db(DB_NAME);
  const collection = db.collection("user");

    // await insertSingleData(collection);
    // await insertMultipleData(collection);
    await readData(collection);
    // await updateData(collection);
    // await readData(collection);
    await deleteData(collection);

  await client.close();
  return "Done";
}

async function insertSingleData(collection) {
  const singleDoc = {
    firstName: "John",
    lastName: "Mani",
    city: "Bengaluru",
    country: "India",
  };

  const result = await collection.insertOne(singleDoc);
  console.log("Single Document Inserted: ", result);
}

async function insertMultipleData(collection) {
  const multiDoc = [
    {
      firstName: "Keshav",
      lastName: "Kumar",
      city: "Jaipur",
      country: "India",
    },
    {
      firstName: "Kartik",
      lastName: "PB",
      city: "Bengaluru",
      country: "India",
    },
    {
      firstName: "Pratyush",
      lastName: "",
      city: "Bhubaneswar",
      country: "India",
    },
    {
      firstName: "Harish",
      lastName: "Reddy",
      city: "Bengaluru",
      country: "India",
    },
  ];

  const result = await collection.insertMany(multiDoc);
  console.log("Single Document Inserted: ", result);
}

async function readData(collection) {
  const documents = await collection.find({}).toArray();
  console.log("All Documents ==> ", documents.length);
  console.log(documents);

  const bengaluruResidents = await collection
    .find({ city: "Bengaluru" })
    .count();

  console.log("Bengaluru residents are: ", bengaluruResidents);
}

async function updateData(collection) {
  const doc = await collection.findOne({ firstName: "Pratyush" });
  const id = doc["_id"].toString();

  const result = await collection.updateOne(
    { _id: id },
    { $set: { lastName: "Anand" } }
  );

  console.log("Updated document: ", result);
}

async function deleteData(collection) {
    const result = await collection.deleteOne({ firstName: 'Harish'});
    console.log("Document Deleted ==>");
    console.log(result);
}

connectDB().then(console.log).catch(console.error);
