const express = require('express');
const db = require('./models')
const lessonsRouter = require("./routes/index")


const app = express(); 
const PORT = process.env.PORT || 3333;

app.use(express.json())
db.sequelize.sync()
app.use('/api', lessonsRouter)

app.listen(PORT, () => console.log(`lessons_report listening on port ${PORT}!`)); 