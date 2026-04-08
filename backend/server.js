
import { PORT } from "./config/env.js";

import app from "./app.js";
import { connectToDatabase } from "./config/database.js";

const startServer = async () => {
  try {
    await connectToDatabase();
    const port = process.env.PORT || PORT || 5001;
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
      
      
    });
  } catch (err) {
    console.error("Server startup failed:", err);
    process.exit(1);
  }
};
startServer();
