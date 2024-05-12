import "dotenv/config";
import { router as roomRoutes } from "./routes/roomRoutes";
import { app, server } from "./routes/socket";
import { log } from "./utils/log";

app.use("/rooms", roomRoutes);

server.listen(process.env.PORT || 4000, () => {
  log("SERVER RUNNING");
});