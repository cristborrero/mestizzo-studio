import { pgTable, serial, text, decimal, jsonb, numeric, timestamp, integer } from 'drizzle-orm/pg-core';

export const services = pgTable('services', {
  id: serial('id').primaryKey(),
  code: text('code').notNull().unique(),
  category: text('category').notNull(),
  name: text('name').notNull(),
  description: text('description'),
  priceUsd: decimal('price_usd', { precision: 20, scale: 2 }).notNull(),
  priceColRef: decimal('price_col_ref', { precision: 20, scale: 2 }),
  metadata: jsonb('metadata'),
});

export const quoteRequests = pgTable('quote_requests', {
  id: serial('id').primaryKey(),
  servicesJson: jsonb('services_json').notNull(),
  totalUsd: numeric('total_usd', { precision: 10, scale: 2 }).notNull(),
  serviceCount: integer('service_count').notNull().default(0),
  status: text('status').notNull().default('draft'),
  createdAt: timestamp('created_at').defaultNow(),
});

export type Service = typeof services.$inferSelect;
export type NewService = typeof services.$inferInsert;
export type QuoteRequest = typeof quoteRequests.$inferSelect;

export const authorizedUsers = pgTable('authorized_users', {
  id: serial('id').primaryKey(),
  email: text('email').notNull().unique(),
  addedBy: text('added_by'), // To track who added this user (e.g., cristborrero@gmail.com)
  createdAt: timestamp('created_at').defaultNow(),
});

export type AuthorizedUser = typeof authorizedUsers.$inferSelect;
