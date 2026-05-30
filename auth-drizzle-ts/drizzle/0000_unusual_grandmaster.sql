CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"first_Name" varchar(45) NOT NULL,
	"last_Name" varchar(45),
	"email, {length: 322}" varchar NOT NULL,
	"password" varchar(66),
	"salt" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	CONSTRAINT "users_email, {length: 322}_unique" UNIQUE("email"," {length: 322}")
);
