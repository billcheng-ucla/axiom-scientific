var express = require('express')
var path = require('path')
var logger = require('morgan')
var bodyParser = require('body-parser')
require('babel-register');
var passport = require('passport')
var swig  = require('swig');
var React = require('react');
var ReactDOM = require('react-dom/server');
var Router = require('react-router');
var routes = require('./app/routes');
var mongoose = require('mongoose')
var User = require('./models/user')
var Product = require('./models/product')
var config = require('./config')
mongoose.connect(config.database);
mongoose.connection.on('error', function() {
  console.info('Error: Could not connect to MongoDB. Did you forget to run `mongod`?');
})


var app = express()

app.set('port', process.env.PORT || 3000)
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

/*** Passport for Password Authentication ***/
// app.use(passport.initialize())
// var localSignupStrategy = require('./passport/local-signup')
// var localLoginStrategy = require('./passport/local-login')
// passport.use('local-signup', localSignupStrategy)
// passport.use('local-login', localLoginStrategy)
// var authCheckMiddleware = require('./middleware/auth-check')
// app.use('/api', authCheckMiddleware)
/*** Passport for Password Authentication END ***/

app.use(express.static(path.join(__dirname, 'public')))

app.post('/api/users', function(req, res, next)
{
  User.create(req.body, function(err, user)
  {
    if (err) {console.log("Error", err)}
    console.log(user)
    res.json(user)
  })
})

app.post('/login', function(req, res, next)
{
  User.findOne({'email': req.body.email}, function(err, user) {
    if (err) { console.log('error', err); }
    if (user && req.body.password === user.password)
    {
      console.log(user)
      res.json(user)
    }
    else
    {
      console.log("User does not exist")
    }
  })
})

app.get('/api/users', function(req, res, next)
{
  User.find({}, function(err, users)
  {
    res.json(users)
  })
})

app.get('/api/products', function(req, res, next)
{
  Product.find({}, function(err, products)
  {
    res.json(products)
  })
})

app.get('/api/products/:sku', function(req, res, next)
{
  var sku = req.params.sku
  Product.findOne({sku: sku}, function(err, product) {
    if (err) return next(err)
    if (!product) {
      return res.status(404).send({message: "Product not found"})
    }

    res.send(product)
  })
})

app.use(function(req, res) {
  Router.match({ routes: routes.default, location: req.url }, function(err, redirectLocation, renderProps) {
    if (err) {
      res.status(500).send(err.message)
    } else if (redirectLocation) {
      res.status(302).redirect(redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      var html = ReactDOM.renderToString(React.createElement(Router.RoutingContext, renderProps));
      var page = swig.renderFile('views/index.html', { html: html });
      res.status(200).send(page);
    } else {
      res.status(404).send('Page Not Found')
    }
  });
});

app.listen(app.get('port'), function() 
{
  console.log('Express server listening on port ' + app.get('port'))
})