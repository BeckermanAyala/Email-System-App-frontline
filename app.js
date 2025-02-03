const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const DBConnect = require("./utils/db-connect");



dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const db = new DBConnect();
db.init();


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
