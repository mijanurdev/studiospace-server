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
  {
  title: "FrameHouse Photo Studio",
  category: "Photo Studios",
  hourlyRate: 28,
  securityDeposit: 55,
  maxCapacity: 9,
  location: "Uttara, Dhaka",
  image: "https://images.unsplash.com/photo-1471341971476-ae15ff5dd4ea?auto=format&fit=crop&w=800&q=80",
  amenities: ["Natural Light", "Backdrop", "Changing Room"],
  overview: "Bright photo studio with natural light and backdrops, perfect for portraits and product shoots.",
  ownerEmail: "host@studiospace.com",
  ownerName: "StudioSpace Host",
},
{
  title: "EchoPoint Sound Stage",
  category: "Sound Stages",
  hourlyRate: 65,
  securityDeposit: 150,
  maxCapacity: 20,
  location: "Tejgaon, Dhaka",
  image: "https://images.unsplash.com/photo-1526478806334-5fd488fcaabc?auto=format&fit=crop&w=800&q=80",
  amenities: ["Sound System", "Stage Lights", "Green Room"],
  overview: "Large sound stage with pro sound system and stage lights, ideal for performances and shoots.",
  ownerEmail: "host@studiospace.com",
  ownerName: "StudioSpace Host",
},
{
  title: "MicDrop Podcast Room",
  category: "Podcast Rooms",
  hourlyRate: 18,
  securityDeposit: 35,
  maxCapacity: 4,
  location: "Dhanmondi, Dhaka",
  image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=800&q=80",
  amenities: ["Microphones", "Soundproof", "Editing Desk"],
  overview: "Quiet podcast room with quality microphones and soundproof walls, ready for interviews and shows.",
  ownerEmail: "host@studiospace.com",
  ownerName: "StudioSpace Host",
},
{
  title: "Harmony Music Suite",
  category: "Music Suites",
  hourlyRate: 30,
  securityDeposit: 60,
  maxCapacity: 7,
  location: "Gulshan, Dhaka",
  image: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&w=800&q=80",
  amenities: ["Piano", "Guitars", "Recording Setup"],
  overview: "Peaceful music suite with piano and recording setup, perfect for practice and composing.",
  ownerEmail: "host@studiospace.com",
  ownerName: "StudioSpace Host",
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
