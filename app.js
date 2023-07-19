const express = require('express');
const app = express(); //here, app is an object
const bodyParser = require('body-parser');
const path = require('path');
const rootDir = require('./util/path');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');
const errorController = require('./controllers/error404');

const User = require ('./models/user');

const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const MONGODB_URI = 'mongodb+srv://devgupta200204:devgupta55@cluster0.q3eygnj.mongodb.net/shop';
const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions'
});
store.on('error', (error) => console.log(error));
app.set('view engine', 'ejs'); //templating engine
app.set('views', 'views');
//request parsing middleware
//should be added before route handling middlewares
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.use((request, response, next) => {
    User.findById('64a588a1f72fa4d2c08fec5d')
    .then(user =>{
        request.user = user;
        next();
    })
    .catch(err => console.log(err));
})
app.use(
    session({
        secret: 'my secret', 
        resave: false, 
        saveUninitialized: false,
        store: store
    })
);
app.use(shopRoutes);
app.use(authRoutes);
app.use('/admin',adminRoutes);


//error 404 middleware as if the request is not
//handled by the above middlewares it would land here
app.use(errorController.error404);

mongoose
.connect(MONGODB_URI)
.then(result => {
    User.findOne().then(user => {
        if(!user){
            const user = new User({
                name: "Dev",
                email: "dev@test.com",
                cart: {
                    items: []
                }
            });
            user.save();
        }
    })
    app.listen(3000);
})
.catch(err => console.log(err));
