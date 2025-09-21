import type { Config } from "tailwindcss";

const config = {
  content: ["./client/index.html", "./client/src/**/*.{ts,tsx}"],
  theme: {},
  plugins: [],
} satisfies Config;

export default config;
