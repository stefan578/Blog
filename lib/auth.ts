import "server-only";
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { MongoClient } from "mongodb";

const globalForMongo = globalThis as typeof globalThis & { authMongoClient?: MongoClient; authMongoPromise?: Promise<MongoClient> };

export async function getAuth() {
  const uri = process.env.MONGO_URI;
  if (!uri) throw new Error("MONGO_URI is missing. Configure it in your deployment environment.");
  const secret = process.env.BETTER_AUTH_SECRET;
  if (!secret) throw new Error("BETTER_AUTH_SECRET is missing.");

  const client = globalForMongo.authMongoClient ?? new MongoClient(uri);
  globalForMongo.authMongoClient = client;
  const clientPromise = globalForMongo.authMongoPromise ?? client.connect();
  globalForMongo.authMongoPromise = clientPromise;

  const connectedClient = await clientPromise;
  return betterAuth({
    database: mongodbAdapter(connectedClient.db()),
    baseURL: process.env.BETTER_AUTH_URL,
    secret,
    emailAndPassword: { enabled: true },
  });
}
