import mongoose, { type Mongoose } from "mongoose";

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: { conn: Mongoose | null; promise: Promise<Mongoose> | null } | undefined;
}

const uri = process.env.MONGO_URI ?? "";
if (!uri) throw new Error("MONGO_URI is missing. Copy .env.example to .env.local and configure MongoDB.");

const cache = global.mongooseCache ?? (global.mongooseCache = { conn: null, promise: null });

export default async function dbConnect() {
  if (cache.conn) return cache.conn;
  if (!cache.promise) cache.promise = mongoose.connect(uri, { bufferCommands: false });
  try {
    cache.conn = await cache.promise;
  } catch (error) {
    cache.promise = null;
    throw error;
  }
  return cache.conn;
}
