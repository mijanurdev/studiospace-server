import "dotenv/config";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI);

const studios = [
  {
    title: "Lightbox Photo Studio",
    category: "Photo Studios",
    hourlyRate: 25,
    securityDeposit: 50,
    maxCapacity: 10,
    location: "Dhanmondi, Dhaka",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80",
    amenities: ["Cyc Wall", "Softbox Lighting", "Backdrop Stand"],
    overview: "Bright photo studio with cyc wall and softbox lighting for portraits and product shoots.",
    ownerEmail: "host@studiospace.com",
    ownerName: "StudioSpace Host",
    createdAt: new Date(),
  },
  {
    title: "CineFrame Sound Stage",
    category: "Sound Stages",
    hourlyRate: 80,
    securityDeposit: 200,
    maxCapacity: 30,
    location: "Banani, Dhaka",
    image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800&q=80",
    amenities: ["Green Screen", "Cinema Lighting", "Soundproof Walls"],
    overview: "Large sound stage with green screen and cinema lighting for film and video shoots.",
    ownerEmail: "host@studiospace.com",
    ownerName: "StudioSpace Host",
    createdAt: new Date(),
  },
  {
    title: "VoiceBox Podcast Room",
    category: "Podcast Rooms",
    hourlyRate: 20,
    securityDeposit: 40,
    maxCapacity: 6,
    location: "Uttara, Dhaka",
    image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=800&q=80",
    amenities: ["Condenser Mic", "Soundproof Booth", "Mixing Desk"],
    overview: "Quiet podcast room with condenser mic and mixing desk for clean recordings.",
    ownerEmail: "host@studiospace.com",
    ownerName: "StudioSpace Host",
    createdAt: new Date(),
  },
  {
    title: "Melody Music Suite",
    category: "Music Suites",
    hourlyRate: 35,
    securityDeposit: 80,
    maxCapacity: 8,
    location: "Mirpur, Dhaka",
    image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=800&q=80",
    amenities: ["Grand Piano", "Drum Kit", "Audio Interface"],
    overview: "Music recording suite with piano, drums and audio interface for bands and singers.",
    ownerEmail: "host@studiospace.com",
    ownerName: "StudioSpace Host",
    createdAt: new Date(),
  },
  {
    title: "Canvas Art Workshop",
    category: "Art Workshops",
    hourlyRate: 15,
    securityDeposit: 30,
    maxCapacity: 15,
    location: "Bashundhara, Dhaka",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&q=80",
    amenities: ["Easels", "Paint Supplies", "Natural Light"],
    overview: "Open art workshop with easels and paint supplies for classes and group work.",
    ownerEmail: "host@studiospace.com",
    ownerName: "StudioSpace Host",
    createdAt: new Date(),
  },
  {
    title: "Golden Hour Photo Studio",
    category: "Photo Studios",
    hourlyRate: 30,
    securityDeposit: 60,
    maxCapacity: 12,
    location: "Gulshan, Dhaka",
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80",
    amenities: ["Natural Light", "Reflectors", "Changing Room"],
    overview: "Photo studio with big windows and natural light for golden hour shoots.",
    ownerEmail: "host@studiospace.com",
    ownerName: "StudioSpace Host",
    createdAt: new Date(),
  },
];

async function seed() {
  try {
    await client.connect();
    console.log("You successfully connected to MongoDB!");
    const db = client.db("StudioSpace");
    const studiosCollection = db.collection("studios");
    await studiosCollection.deleteMany({});
    const result = await studiosCollection.insertMany(studios);
    console.log(result.insertedCount + " studios added!");
  } catch (err) {
    console.dir(err);
  } finally {
    await client.close();
  }
}

seed();
