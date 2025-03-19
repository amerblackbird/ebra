CREATE TABLE "logins" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"login_time" timestamp DEFAULT now(),
	"ip_address" text NOT NULL,
	"user_agent" text NOT NULL,
	"password" text NOT NULL,
	"salt" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "transactions" ALTER COLUMN "amount" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "transactions" ALTER COLUMN "amount" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "wallets" ALTER COLUMN "balance" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "username" text NOT NULL;--> statement-breakpoint
ALTER TABLE "logins" ADD CONSTRAINT "logins_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "password";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "salt";--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_username_unique" UNIQUE("username");