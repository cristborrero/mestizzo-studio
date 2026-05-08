CREATE TABLE "authorized_users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"added_by" text,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "authorized_users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "quote_requests" (
	"id" serial PRIMARY KEY NOT NULL,
	"services_json" jsonb NOT NULL,
	"total_usd" numeric(10, 2) NOT NULL,
	"service_count" integer DEFAULT 0 NOT NULL,
	"status" text DEFAULT 'draft' NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "services" (
	"id" serial PRIMARY KEY NOT NULL,
	"code" text NOT NULL,
	"category" text NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"price_usd" numeric(20, 2) NOT NULL,
	"price_col_ref" numeric(20, 2),
	"metadata" jsonb,
	CONSTRAINT "services_code_unique" UNIQUE("code")
);
