const express = require('express');
const app = express(); //here, app is an object
const bodyParser = require('body-parser');
const path = require('path');
const rootDir = require('./util/path');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorController = require('./controllers/error404');
const sequelize = require('./util/database');
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const Order = require('./models/order');
const OrderItem = require('./models/order-item');

app.set('view engine', 'ejs'); //templating engine
app.set('views', 'views');
//request parsing middleware
//should be added before route handling middlewares
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.use((request, response, next) => {
    User.findByPk(1)
    .then(user =>{
        request.user = user;
        next();
    })
    .catch(err => console.log(err));
})

app.use(shopRoutes);
app.use('/admin',adminRoutes);


//error 404 middleware as if the request is not
//handled by the above middlewares it would land here
app.use(errorController.error404);

Product.belongsTo(User, {
    constraints: true,
    onDelete: 'CASCADE'
});
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, {through: CartItem});
Product.belongsToMany(Cart, {through: CartItem});
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, {through: OrderItem});

//it syncs our models to the db by creating the appt. tables
sequelize
//.sync({force: true})
.sync()
.then(result => {
    return User.findByPk(1);
    //console.log(result);
})
.then(user => {
    if(!user) {
       return User.create({name: 'Dev', 
       email: 'testemail@test.com'});
    }
    return Promise.resolve(user);
})
.then(user => {
    //console.log(user);
    user.createCart();
   
})
.then(cart => {
    app.listen(3000);
})
.catch(err => {
    console.log(err);
})
