import express from "express";
import { createClient } from "redis";

const server = express();

const client = await createClient({
  url: "redis://redis-server:6379",
})
  .on("error", (err) => console.log("Redis Client Error", err))
  .connect();

await client.set("inventorycount", 0);
server.get("/api/get", async (req, res) => {
  const count = await client.get("inventorycount");
  const count_increment = parseInt(count) + 1;
  await client.set("inventorycount", count_increment);
  console.log(`Items in inventory: ${count_increment}`);
  res.json({ current_inventory: count_increment });
});

server.listen(8080, () => {
  console.log("Globoapp server listening on port 8080");
});
