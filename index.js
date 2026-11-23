import express from "express";
import "dotenv/config";
import cors from "cors";
import { MongoClient, ObjectId } from "mongodb";
import { createRemoteJWKSet, jwtVerify } from "jose";

const app = express();
const port = process.env.PORT || 8000;

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

const client = process.env.MONGODB_URI
  ? new MongoClient(process.env.MONGODB_URI)
  : null;

export async function connectToMongoDB() {
  try {
    if (!client) {
      console.log("MONGODB_URI not found in .env file");
      return null;
    }
    await client.connect();
    console.log("You successfully connected to MongoDB!");
    return client;
  } catch (err) {
    console.dir(err);
    return null;
  }
}

const mongoClient = await connectToMongoDB();

let db = null;
let studiosCollection = null;
let bookingsCollection = null;

if (mongoClient) {
  db = mongoClient.db("StudioSpace");
  studiosCollection = db.collection("studios");
  bookingsCollection = db.collection("bookings");
}

export { studiosCollection, bookingsCollection };

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send({ msg: "Unauthorized!" });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).send({ msg: "Unauthorized!" });
  }

  const JWKS = createRemoteJWKSet(
    new URL(`${process.env.CLIENT_URL}/api/auth/jwks`)
  );

  try {
    const { payload } = await jwtVerify(token, JWKS);
    req.user = payload;
    next();
  } catch (error) {
    return res.status(401).send({ msg: "Unauthorized!" });
  }
};

export { verifyToken };

app.get("/api/studios", async (req, res) => {
  try {
    const category = req.query.category;
    const limit = req.query.limit ? parseInt(req.query.limit) : 0;
    let query = {};
    if (category) {
      query.category = category;
    }
    let cursor = studiosCollection.find(query);
    if (limit > 0) {
      cursor = cursor.limit(limit);
    }
    const studios = await cursor.toArray();
    res.send(studios);
  } catch (error) {
    res.status(500).send({ msg: "Server Error!" });
  }
});

app.get("/api/studios/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const studio = await studiosCollection.findOne({ _id: new ObjectId(id) });
    if (!studio) {
      return res.status(404).send({ msg: "Studio not found!" });
    }
    res.send(studio);
  } catch (error) {
    res.status(400).send({ msg: "Invalid studio id!" });
  }
});

app.post("/api/studios", verifyToken, async (req, res) => {
  try {
    const data = req.body;
    if (!data.title || !data.category || !data.hourlyRate) {
      return res.status(400).send({ msg: "Title, category and hourly rate are required!" });
    }
    data.createdAt = new Date();
    const result = await studiosCollection.insertOne(data);
    res.status(201).send(result);
  } catch (error) {
    res.status(500).send({ msg: "Server Error!" });
  }
});

app.patch("/api/studios/:id", verifyToken, async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    delete data._id;
    const result = await studiosCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: data }
    );
    if (result.matchedCount === 0) {
      return res.status(404).send({ msg: "Studio not found!" });
    }
    res.send(result);
  } catch (error) {
    res.status(400).send({ msg: "Invalid studio id!" });
  }
});

app.delete("/api/studios/:id", verifyToken, async (req, res) => {
  try {
    const id = req.params.id;
    const result = await studiosCollection.deleteOne({
      _id: new ObjectId(id),
    });
    if (result.deletedCount === 0) {
      return res.status(404).send({ msg: "Studio not found!" });
    }
    res.send(result);
  } catch (error) {
    res.status(400).send({ msg: "Invalid studio id!" });
  }
});

app.get("/api/bookings", async (req, res) => {
  try {
    const email = req.query.email;
    let query = {};
    if (email) {
      query.userEmail = email;
    }
    const bookings = await bookingsCollection
      .find(query)
      .sort({ createdAt: -1 })
      .toArray();
    res.send(bookings);
  } catch (error) {
    res.status(500).send({ msg: "Server Error!" });
  }
});

app.post("/api/bookings", verifyToken, async (req, res) => {
  try {
    const data = req.body;
    if (!data.studioId || !data.date || !data.startTime || !data.endTime || !data.userEmail) {
      return res.status(400).send({ msg: "Studio, date, time and email are required!" });
    }
    const studio = await studiosCollection.findOne({
      _id: new ObjectId(data.studioId),
    });
    if (!studio) {
      return res.status(404).send({ msg: "Studio not found!" });
    }
    const booking = {
      studioId: data.studioId,
      studioTitle: studio.title,
      studioImage: studio.image,
      hourlyRate: studio.hourlyRate,
      date: data.date,
      startTime: data.startTime,
      endTime: data.endTime,
      userEmail: data.userEmail,
      userName: data.userName,
      status: "Pending",
      createdAt: new Date(),
    };
    const result = await bookingsCollection.insertOne(booking);
    res.status(201).send(result);
  } catch (error) {
    res.status(400).send({ msg: "Invalid booking data!" });
  }
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
