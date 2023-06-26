const express = require('express');
const app = express(); //here, app is an object
const bodyParser = require('body-parser');
const path = require('path');
const rootDir = require('./util/path');

const adminRoutes = require('./routes/admin');
//const shopRoutes = require('./routes/shop');
const errorController = require('./controllers/error404');

const mongoConnect = require('./util/database').mongoConnect;

app.set('view engine', 'ejs'); //templating engine
app.set('views', 'views');
//request parsing middleware
//should be added before route handling middlewares
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.use((request, response, next) => {
    // User.findByPk(1)
    // .then(user =>{
    //     request.user = user;
    //     next();
    // })
    // .catch(err => console.log(err));
})

//app.use(shopRoutes);
app.use('/admin',adminRoutes);

//error 404 middleware as if the request is not
//handled by the above middlewares it would land here
app.use(errorController.error404);

mongoConnect((client) => {
    app.listen(3000);
})