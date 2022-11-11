import { Client, GatewayIntentBits } from "discord.js";
import ready from "./listeners/ready";
import interactionCreate from "./listeners/interactionCreate";
import { config } from "dotenv";

console.log("Bot is starting...");

config();

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

ready(client);
interactionCreate(client);

client.login(process.env.DISCORD_TOKEN);
