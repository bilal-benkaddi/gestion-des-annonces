const express = require('express');
const app = express();
var cookieParser = require('cookie-parser');
app.use(cookieParser());
app.set('view engine', 'ejs');
const database = require('./config/db');
const port = 3001;
const router = require('./routes/router');
const bodyParser = require('body-parser');
const path = require('path');

app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    "/css",
    express.static(path.join(__dirname, "node_modules/bootstrap/dist/css"))
  )
  
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(router);
app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});
