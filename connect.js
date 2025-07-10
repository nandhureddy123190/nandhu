const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://nandhureddyz123:nandhureddy123@cluster0.5ohkcma.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB!");

    const db = client.db("test"); // Replace with your actual DB name if different
    const collection = db.collection("sample"); // Replace with your collection name

    const docs = await collection.find({}).toArray();
    console.log("📦 Documents:", docs);
  } catch (err) {
    console.error("❌ Connection failed:", err.message);
  } finally {
    await client.close();
  }
}

run();
