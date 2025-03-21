ALTER TABLE "logins" ADD COLUMN "created_by_id" uuid;--> statement-breakpoint
ALTER TABLE "logins" ADD COLUMN "updated_by_id" uuid;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "created_by_id" uuid;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "updated_by_id" uuid;--> statement-breakpoint
ALTER TABLE "wallets" ADD COLUMN "created_by_id" uuid;--> statement-breakpoint
ALTER TABLE "wallets" ADD COLUMN "updated_by_id" uuid;--> statement-breakpoint
ALTER TABLE "logins" ADD CONSTRAINT "logins_created_by_id_users_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "logins" ADD CONSTRAINT "logins_updated_by_id_users_id_fk" FOREIGN KEY ("updated_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "wallets" ADD CONSTRAINT "wallets_created_by_id_users_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "wallets" ADD CONSTRAINT "wallets_updated_by_id_users_id_fk" FOREIGN KEY ("updated_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;