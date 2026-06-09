const express = require("express");
const cors = require("cors");

const newsRoutes = require("./routes/newsRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/news", newsRoutes);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});