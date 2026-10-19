import { getAuth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

async function handle(request: Request, method: "GET" | "POST") {
  const auth = await getAuth();
  const handlers = toNextJsHandler(auth);
  return handlers[method](request);
}

export const GET = (request: Request) => handle(request, "GET");
export const POST = (request: Request) => handle(request, "POST");
