const express = require('express');

const db = require('./models')
const router = require("./routes/index")
const apiDocs = require("./swagger/index");

const app = express(); 
const PORT = process.env.PORT || 3333;

app.use(express.json())
//db.sequelize.sync()
app.use("/api-docs", apiDocs);
app.use('/api', router)


app.listen(PORT, () => console.log(`lessons_report listening on port ${PORT}!`)); 