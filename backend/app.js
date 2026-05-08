const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());
const userRoutes = require("./src/routes/userRoutes");

app.use("/api/users", userRoutes);
const expenseRoutes = require(
    "./src/routes/expenseRoutes"
);

app.use("/api/expenses", expenseRoutes);
const categoryRoutes = require(
    "./src/routes/categoryRoutes"
);

app.use(
    "/api/categories",
    categoryRoutes
);
const expenseSessionRoutes = require(
    "./src/routes/expenseSessionRoutes"
);

app.use(
    "/api/sessions",
    expenseSessionRoutes
);

const analyticsRoutes = require(
    "./src/routes/analyticsRoutes"
);

app.use(
    "/api/analytics",
    analyticsRoutes
);
module.exports = app;