const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const routes = require('./routes/routes')
const { connectDB } = require('./configuration/mongo')

connectDB()
const app = express()
const port = process.env.PORT || 8080

app.use('/', routes)
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (_req, res) => {
    res.send('<h1>Express Server Working Properly!</h1>');
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});