require("dotenv").config();
require("express-async-errors");
const config = require("config")

// imports
const express = require("express");
const app = express();
const connection = require("./db");
const cors = require("cors");
const path = require("path")
require("./production")(app)

// importing routes
// const signup = require("./routes/signup");
const login = require("./routes/login");
const user = require("./routes/user");
const goods = require("./routes/goods");
const brokers = require("./routes/brokers");
const clients = require("./routes/clients");
const quotes = require("./routes/quotes");
const emails = require("./routes/emails");
const productquotation = require("./routes/productquotation");
const storagequotation = require("./routes/storagequotation");
const logisticsquotation = require("./routes/logisticsquotation");
const storageshipment = require("./routes/storageshipment");
const logisticsshipmentrecords = require("./routes/logisticsshipment");
const admin = require("./routes/admins");
const groupedshipment = require("./routes/groupedshipment");
const sendemail = require("./routes/sendemail")

// the database
connection();

const privateKey = process.env.PRIVATE_KEY 

if (!config.get("jwtPrivateKey")) {
		throw new Error('FATAL ERROR!!: jwtPrivateKey is not defined')
	}


// middlewares
app.use(cors());
app.use(express.json());
// app.use("/api/signup", signup);
app.use("/api/login", login);
app.use("/api/users", user);
app.use("/api/goods", goods);;
app.use("/api/brokers", brokers);
app.use("/api/clients", clients);
app.use("/api/quotation", quotes);
app.use("/api/emails", emails);
app.use("/api/productquotation", productquotation);
app.use("/api/storagequotation", storagequotation);
app.use("/api/storageshipment", storageshipment);
app.use("/api/logisticsrecords", logisticsshipmentrecords);
app.use("/api/logisticsquotation", logisticsquotation);
app.use("/api/logisticsrecords/grouped", groupedshipment )
app.use("/sendemail", sendemail)
// app.use("/api/signup", admin);
app.use("/api/admin", admin);



// checking if the project is in production
// if (process.env.NODE_ENV === "production") {
// 	app.use(express.static(path.join(__dirname, "client", "build")))
// 	app.get("*", (req, res) => {
// 		res.sendFile(
// 			path.join(__dirname, "client", "build", "index.html")
// 			)
// 	})
// }

// port
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening to port : ${port}`));
