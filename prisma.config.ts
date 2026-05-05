import { defineConfig } from "prisma/config";
export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: "mysql://root:1234@localhost:3306/umc_10th_mission5",
  },
});