import { Hono } from 'hono'
import mongoose from 'mongoose'
import { load } from "https://deno.land/std@0.224.0/dotenv/mod.ts";
const env = await load();
const app = new Hono()
const url = env["MONGO_URL"];
await mongoose.connect(url).then(() => {
  console.log("mongo DB 接続");
}).catch((err) => {
  console.log(err);
});
app.get('/', (c: { text: (arg0: string) => any; }) => {
  return c.text('Hello Hono!')
})

Deno.serve(app.fetch)
