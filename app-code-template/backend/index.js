import express from "express";
import cors from "cors";
import parser from "body-parser";
import { createClient } from "redis";
import pg from "pg";

const server = express();

// Use cors middleware
server.use(cors());

const client = await createClient({
  url: "redis://DATABASE_REDIS_DNS_NAME:6379",
})
  .on("error", (err) => console.log("Redis Client Error", err))
  .connect();

const pool = new pg.Pool({
  user: "postgres",
  host: "DATABASE_POSTGRES_DNS_NAME",
  database: "postgres",
  password: "password",
  port: 5432,
});

await client.set("inventorycount", 0);
server.get("/api/get", async (req, res) => {
  const count = await client.get("inventorycount");
  const count_increment = parseInt(count) + 1;
  const amount = count_increment * 10;

  await client.set("inventorycount", count_increment);
  await pool.query(`UPDATE inventory SET amount=${amount} WHERE sku=0001`);

  console.log(`Items in inventory: ${count_increment}`);
  console.log(`Updating price in inventory to: \$${amount}`);

  const response = {
    count: count_increment,
    amount: amount,
  };
  res.json(response);
});

server.listen(8080, () => {
  console.log("Node server listening on port 8080");
});
