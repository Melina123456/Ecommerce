import dotenv from "dotenv";

dotenv.config({ path: ".env" });

export const PORT = process.env.PORT;

export const JWT_SECRET = process.env.JWT_SECRET!;

export const ACCESS_TOKEN_EXPIRY = process.env.ACCESS_TOKEN_EXPIRY!;

export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET!;

export const REFRESH_TOKEN_EXPIRY = process.env.REFRESH_TOKEN_EXPIRY!;
