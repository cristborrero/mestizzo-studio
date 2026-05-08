
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from '../src/lib/db/schema';


async function main() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) throw new Error('DATABASE_URL is not set');
  
  const client = postgres(connectionString);
  const db = drizzle(client, { schema });
  
  const allServices = await db.select().from(schema.services);
  console.log(JSON.stringify(allServices, null, 2));
  
  await client.end();
}

main();
