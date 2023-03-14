const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const userRoute = require('./router/userRoute');

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan('dev'));

app.use(bodyParser.json());


mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Server running on port http://localhost:${process.env.PORT}`);
        })
    })
    .catch((error) => console.log(error.message));

    app.use('/api/user', userRoute);


