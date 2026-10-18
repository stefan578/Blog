import "server-only";
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI;
if (!uri) throw new Error("MONGO_URI is missing. Copy .env.example to .env.local and configure MongoDB.");
if (!process.env.BETTER_AUTH_SECRET) throw new Error("BETTER_AUTH_SECRET is missing.");

const globalForMongo = globalThis as typeof globalThis & { authMongoClient?: MongoClient; authMongoPromise?: Promise<MongoClient> };
const client = globalForMongo.authMongoClient ?? new MongoClient(uri);
if (process.env.NODE_ENV !== "production") globalForMongo.authMongoClient = client;
const clientPromise = globalForMongo.authMongoPromise ?? client.connect();
if (process.env.NODE_ENV !== "production") globalForMongo.authMongoPromise = clientPromise;

export const auth = betterAuth({
  database: mongodbAdapter((await clientPromise).db()),
  baseURL: process.env.BETTER_AUTH_URL,
  secret: process.env.BETTER_AUTH_SECRET,
  emailAndPassword: { enabled: true },
});
