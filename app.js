const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const port = require('./configs/appConfig');
const mongoConnection = require('./connections/mongoConnection');
const routes = require('./routes');
const docs = require('./helpers/docs')

const app = express();
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/users", routes.userRoutes);
app.use("/", docs);
app.set('view engine', 'pug');
app.set('views', ['./views', './views/user']);

const startServer = async () => {
    try {
        await mongoConnection.connect();
        app.listen(port, () => {
            console.log(`Server is running at http://localhost:${port}/`);
        });
    } catch (error) {
        console.error('Failed to connect to the database', error);
    }
};

startServer();