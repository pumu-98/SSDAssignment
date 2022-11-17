const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
app.use(cookieParser());
app.use(express.json());
const bodyParser = require('body-parser'), cors = require('cors');

// --------------------------------------------------------------------
// APP CONFIG
// --------------------------------------------------------------------
app.use(cors())
   .use(bodyParser.json())
   .use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb+srv://tanya:tanya123@ssdassingment.x6fcsj7.mongodb.net/?retryWrites=true&w=majority',{useNewUrlParser : true,useUnifiedTopology: true},()=>{
    console.log('successfully connected to database');
});


// --------------------------------------------------------------------
// ROUTES
// --------------------------------------------------------------------
const  AvatarRouter = require('./routes/avatar');

app.use("/", AvatarRouter);
const userRouter = require('./routes/User');
app.use('/user',userRouter);

app.listen(5000,()=>{
    console.log('express server started');
});