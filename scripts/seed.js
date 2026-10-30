require("dotenv").config();

const mongoose = require("mongoose");
const User = require("../models/User");

const users = [
  { name: "John Doe", email: "john.doe@example.com" },
  { name: "Jane Smith", email: "jane.smith@example.com" },
  { name: "Alice Johnson", email: "alice.johnson@example.com" },
  { name: "Bob Williams", email: "bob.williams@example.com" },
  { name: "Charlie Brown", email: "charlie.brown@example.com" },
  { name: "David Miller", email: "david.miller@example.com" },
  { name: "Emma Wilson", email: "emma.wilson@example.com" },
  { name: "Michael Davis", email: "michael.davis@example.com" },
  { name: "Sophia Taylor", email: "sophia.taylor@example.com" },
  { name: "James Anderson", email: "james.anderson@example.com" }
];

async function seed() {
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is missing. Add it to your .env file.");
  }

  await mongoose.connect(process.env.MONGODB_URI);
  const results = await Promise.all(
    users.map((user) =>
      User.updateOne(
        { email: user.email },
        { $set: user },
        { upsert: true }
      )
    )
  );

  const inserted = results.filter(r => r.upsertedCount === 1).length;
  const updated = results.filter(r => r.modifiedCount === 1).length;
  const skipped = results.filter(r => r.matchedCount === 1 && r.modifiedCount === 0).length;

  console.log(`${inserted} new users inserted, ${updated} existing users updated, and ${skipped} unchanged users skipped.`);
    await mongoose.disconnect();
}

seed().catch(async (error) => {
  console.error(`Seeding failed: ${error.message}`);
  await mongoose.disconnect();
  process.exitCode = 1;
});
