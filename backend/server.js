const express = require("express");
const cors = require("cors");

const therapistRoutes = require("./routes/therapistRoutes");
const clientRoutes = require("./routes/clientRoutes");
const sessionRoutes = require("./routes/sessionRoutes");

const app = express();
app.use(cors()); // Enable CORS for frontend-backend communication
app.use(express.json());

app.use("/api/therapists", therapistRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/sessions", sessionRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));