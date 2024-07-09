
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoutes = require('./auth/authRoutes');
const {errorHandler,notFoundhandler,demoRoute,unauthorizedRoute} = require('./errorHandling');
const cors = require('cors');


const app = express();

app.use(bodyParser.json());

app.use(cors({
    origin: 'http://localhost:4200' 
}));


app.get('/example', demoRoute);

app.get('/unauthorized',unauthorizedRoute)

app.use('/users', userRoutes);

app.use(notFoundhandler)

app.use(errorHandler);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

