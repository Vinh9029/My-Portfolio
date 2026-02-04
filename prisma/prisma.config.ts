// prisma/prisma.config.ts
import { defineConfig } from '@prisma/cli';

export default defineConfig({
  datasource: {
    db: {
      url: process.env.DATABASE_URL!,
    },
  },
});