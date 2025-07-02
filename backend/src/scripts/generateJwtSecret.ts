import crypto from "crypto";

// This function generates a random JWT secret key of 32 bytes, which is essential for signing JSON Web Tokens.
const secretKey: string = crypto.randomBytes(32).toString("hex");

console.log(`Generated JWT_SECRET: ${secretKey}`);

/*
To run this script using ts-node, follow these steps:
1. Open your terminal.
2. Change directory to the location of this file:
   cd /path/to/your/file
3. Execute the script with ts-node:
   ts-node generateJwtSecret.ts
*/
