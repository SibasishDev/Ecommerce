const express = require('express');
const dbConnect = require('./config/db.connection');
const app = express();
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 8000;
const authRoute = require('./routes/auth.routes');
const {errorHandler,notFound} = require('./middleware/errorHandler');
dbConnect();

app.use(express.static('public'));

app.use(express.json({
    limit: "50mb",
    type: 'application/json'
}));

app.use(express.urlencoded({
    extended: false,
    limit: "50mb"
}));


app.use('/api/user',authRoute);

app.use(notFound);

app.use(errorHandler);


app.listen(PORT, () => {
    console.log(`Server is running at PORT ${PORT}`)
});