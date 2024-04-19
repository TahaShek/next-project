import { MongoClient } from "mongodb";

async function handler(req, res) {
  const client = await MongoClient.connect(
    "mongodb+srv://tahashekh789:afsRtbVxA6mM9QTF@meetup-cluster.oagg7q6.mongodb.net/"
  );
  const db = client.db();
  const meetupCollection = db.collection("meetup");
  if (req.method === "POST") {
    const data = req.body;
    try {
      const result = await meetupCollection.insertOne(data);
      client.close();
      res.status(200).json({ message: "Meetup Inserted" });
    } catch (error) {
      res.status(500).json({ message: error, success: false });
    }
  }
  if (req.method === "GET") {
    try {
      const result = await meetupCollection.find();
      res.status(200).json({ data: await result.toArray(), success: true });
      client.close();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default handler;
