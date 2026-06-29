import { config } from "dotenv";
import { expand } from "dotenv-expand";

// Load and expand .env so DATABASE_URL resolves variable references (e.g. ${DATABASE_URL_LOCAL})
expand(config({ path: ".env" }));
