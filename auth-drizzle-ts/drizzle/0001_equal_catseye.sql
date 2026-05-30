ALTER TABLE "users" DROP CONSTRAINT "users_email, {length: 322}_unique";--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "email" varchar(322) NOT NULL;--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "email, {length: 322}";--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_email_unique" UNIQUE("email");