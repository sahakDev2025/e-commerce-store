import "dotenv/config";
import express from 'express';
import cors from "cors"
// this import build the packages or moudules
import fs from "node:fs";
import path from "node:path";

import { clerkMiddleware } from '@clerk/express';
import { clerkWebhookHandler } from './webhooks/clerk';
import { getEnv } from './lib/env';


const env=getEnv();
const app=express();



const rawJson = express.raw({ type: "*/*", limit: "1mb" });

// it's important that you don't parse the webhook event data; it should be in the raw format.
app.post("/webhooks/clerk", rawJson, async (req, res, next) => {
  try {
    await clerkWebhookHandler(req, res);
  } catch (err) {
    next(err);
  }
});

app.use(express.json());
app.use(clerkMiddleware());
app.use(cors());


const publicDir = path.join(process.cwd(), "public");
if(fs.existsSync(publicDir)){
    app.use(express.static(publicDir));

    app.get("/{*any}",(req,res,next)=>{
        if(req.method !== "GET" && req.method !== "HEAD"){
            next();
            return;
        }
        if(req.path.startsWith("/api") || req.path.startsWith("/webhooks")){
            next();
            return;
        }

        res.sendFile(path.join(publicDir, "index.html"),(err=>next(err)))
    });
}


app.listen(env.PORT, ()=> console.log(`Listing on port 3001`))