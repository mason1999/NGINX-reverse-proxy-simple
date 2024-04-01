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

server.get("/api/add", async (req, res) => {
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

server.get("/api/check", async (req, res) => {
  const count = await client.get("inventorycount");
  const postgres_query = await pool.query(
    "SELECT amount as AMOUNT FROM inventory where sku=1"
  );

  console.log("Inventory count", count);
  console.log("postgres_query is...");
  console.log(postgres_query);
  const amount = postgres_query.rows[0].amount;

  const response = {
    count: count,
    amount: amount,
  };
  res.json(response);
});

server.get("/api/sell", async (req, res) => {
  const count = await client.get("inventorycount");
  const count_decrement = parseInt(count) - 1;
  const amount = count_decrement * 10;

  await client.set("inventorycount", count_decrement);
  await pool.query(`UPDATE inventory SET amount=${amount} WHERE sku=0001`);

  console.log(`Items in inventory: ${count_decrement}`);
  console.log(`Updating price in inventory to: \$${amount}`);

  const response = {
    count: count_decrement,
    amount: amount,
  };
  res.json(response);
});
server.listen(8080, () => {
  console.log("Node server listening on port 8080");
});
