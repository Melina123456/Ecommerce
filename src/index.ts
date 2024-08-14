import express, { Express } from "express";
import { errorMiddleware } from "./middlewares/errors";
import { PORT } from "./config/secrets";
import rootRouter from "./routes";

const app: Express = express();

app.use(express.json());

app.use("/api", rootRouter);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
