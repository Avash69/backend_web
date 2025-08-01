// const express = require("express");
// require("dotenv").config();
// require("express-async-errors");
// const connectDb = require("./db/connect");
// const errorHandler = require("./middleware/errorHandler");
// const pathNotFound = require("./middleware/pathNotFound");
// const cloudinary = require("cloudinary").v2;
// const fileUpload = require("express-fileupload");
// const cors = require("cors");
// const productRoute = require("./routes/productRoute");
// const authRoute = require("./routes/authenticationRoute");
// const adminRoute = require("./routes/adminRoutes");
// const ordersRoute = require("./routes/ordersRoute");
// const { clearAdminJwt } = require("./controllers/admin");

// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.CLOUD_API_KEY,
//   api_secret: process.env.CLOUD_API_SECRET,
// });

// const app = express();
// //  middlewares
// app.use(cors({
//   origin:"https://auffur-furnishes.netlify.app"
// }));
// app.use(express.json());
// app.use(
//   fileUpload({
//     useTempFiles: true,
//   })
// );

// app.get("/", (req, res) => {
//   res.status(200).send("<h1>Auffur,ecommerce server</h1> ");
// });

// app.use("/api/v1/products", productRoute);
// app.use("/api/v1/auth", authRoute);
// app.use("/orders", ordersRoute);
// app.use("/api/v1/admin", adminRoute);
// app.use(errorHandler);
// app.use(pathNotFound);

// // clear admin token after 6 hours of inactivity
// setInterval(clearAdminJwt, 6 * 60 * 60 * 1000);

// const port = process.env.PORT || 5000;

// const startServer = async () => {
//   try {
//     await connectDb(process.env.MONGO_URI);
//     app.listen(port, () => console.log(`Server is listening on port ${port}`));
//   } catch (error) {
//     console.error("Server startup failed:", error); // Add this line!
//   }
// };

const express = require("express");
require("dotenv").config();
require("express-async-errors");

const connectDb = require("./db/connect");
const errorHandler = require("./middleware/errorHandler");
const pathNotFound = require("./middleware/pathNotFound");

const cloudinary = require("cloudinary").v2;
const fileUpload = require("express-fileupload");
const cors = require("cors");

const productRoute = require("./routes/productRoute");
const authRoute = require("./routes/authenticationRoute");
const adminRoute = require("./routes/adminRoutes");
const ordersRoute = require("./routes/ordersRoute");
const { clearAdminJwt } = require("./controllers/admin");

// ✅ Cloudinary Config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const app = express();

// ✅ Middleware
app.use(
  cors({
    origin: "https://auffur-furnishes.netlify.app", // Allow frontend access
  })
);
app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

// ✅ Default Route
app.get("/", (req, res) => {
  res.status(200).send("<h1>Auffur ecommerce server</h1>");
});

// ✅ Routes
app.use("/api/v1/products", productRoute);
app.use("/api/v1/auth", authRoute);
app.use("/orders", ordersRoute);
app.use("/api/v1/admin", adminRoute);

// ✅ Error Handlers
app.use(errorHandler);
app.use(pathNotFound);

// ✅ Clear admin JWT periodically (every 6 hours)
setInterval(clearAdminJwt, 6 * 60 * 60 * 1000);

// ✅ Server Start
const port = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDb(process.env.MONGO_URI); // ✅ Corrected variable name
    app.listen(port, () => {
      console.log(`✅ Server is listening on port ${port}`);
    });
  } catch (error) {
    console.error("❌ Server startup failed:", error.message);
  }
};

startServer();
