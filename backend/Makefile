# Makefile

# Variables
DRIZZLE_CMD = npx drizzle-kit

dev:
	pnpm dev

migrate:
	$(DRIZZLE_CMD) push

generate:
	$(DRIZZLE_CMD) generate

seed:
	pnpm tsx scripts/seed.ts

studio:
	$(DRIZZLE_CMD) studio