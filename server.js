var express = require('express')
var path = require('path')
var logger = require('morgan')
var bodyParser = require('body-parser')
require('babel-register');
var passport = require('passport')
var request = require('superagent')
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


/*** MailChimp ***/

var mailchimpInstance   = 'us15',
    listUniqueId        = 'd9091f3d4e',
    mailchimpApiKey     = '98e7dfd5d5d5c7ffcf0e079910cb72cf-us15'

var sendReceipt = function(data)
{
  addMemberToMyList(data).end(function(err, response) {
              if (response.status < 300 || (response.status === 400 && response.body.title === "Member Exists")) {
                var email = data.email_address
                var client_id = data.body.id
                if (response.status < 300) {
                  email = response.body.email_address
                }
                else
                {
                  console.log(response.body.title)
                }
                createCampaign(email).end(function(err, response)
                {
                  if (response.status < 300)
                  {
                    var campaign_id = response.body.id
                    getTemplates().end(function(err, response) {
                      console.log(response.body.templates[0].id)
                      insertContent(campaign_id, response.body.templates[0].id).end(function(err, response) {
                        console.log("Ready to send", response)
                        sendDelivery(campaign_id).end(function(err, response) {
                          deleteUser(client_id)
                        })
                      })
                    })
                  }
                  else
                  {
                    console.log("Creating Campaign Failed")
                  }
                })
              } else {
                console.log("Response", response)
                console.log('Sign Up Failed :(');
              }
    });
}

var addMemberToMyList = function(data)
{
  console.log("Adding Member", data.merge_fields)
  console.log(data['merge_fields[FNAME]'])
  return request
        .post('https://' + mailchimpInstance + '.api.mailchimp.com/3.0/lists/' + listUniqueId + '/members/')
        .set('Content-Type', 'application/json;charset=utf-8')
        .set('Authorization', 'Basic ' + new Buffer('any:' + mailchimpApiKey ).toString('base64'))
        .send({
          'email_address': data.email_address,
          'status': data.status,
          'merge_fields': {
            'FNAME': data['merge_fields[FNAME]'],
            'LNAME': data['merge_fields[LNAME]'],
            'CART': data['merge_fields[CART]'],
            'SHIPNAME': data['merge_fields[SHIPNAME]'],
            'SHIPADD': data['merge_fields[SHIPADD]'],
            'BILLNAME': data['merge_fields[BILLNAME]'],
            'BILLADD': data['merge_fields[BILLADD]'],
            'TOTAL': data['merge_fields[TOTAL]']
          }
        })
}

var createCampaign = function(email)
{
  console.log("Email Email Email", email)
  return request
    .post('https://' + mailchimpInstance + '.api.mailchimp.com/3.0/campaigns/')
    .set('Content-Type', 'application/json;charset=utf-8')
        .set('Authorization', 'Basic ' + new Buffer('any:' + mailchimpApiKey ).toString('base64'))
        .send({
          'type': "regular",
          'title': "Auto-Campaign",
          'recipients': {
            'list_id': listUniqueId,
            'segment_opts': {
              'match': "all",
              'conditions': [{'condition_type': "EmailAddress", 'field': "EMAIL", 'op': "is", 'value': email}]
            }
          },
          'settings': {
            'subject_line': "Purchase Receipt",
            'from_name': "Shadowist",
            'reply_to': "shadowist@live.com"
          }
        })
}

var getTemplates = function()
{
  return request
    .get('https://' + mailchimpInstance + '.api.mailchimp.com/3.0/templates/')
    .set('Content-Type', 'application/json;charset=utf-8')
        .set('Authorization', 'Basic ' + new Buffer('any:' + mailchimpApiKey ).toString('base64'))
        .send({

        })
}

var insertContent = function(campaign_id, template_id)
{
  return request
    .put('https://' + mailchimpInstance + '.api.mailchimp.com/3.0/campaigns/' + campaign_id + '/content')
    .set('Content-Type', 'application/json;charset=utf-8')
        .set('Authorization', 'Basic ' + new Buffer('any:' + mailchimpApiKey ).toString('base64'))
        .send({
          'template': {
            'id': template_id
          }
        })
}
var sendDelivery = function(campaign_id)
{
  request
    .post('https://' + mailchimpInstance + '.api.mailchimp.com/3.0/campaigns/' + campaign_id + '/actions/send')
    .set('Content-Type', 'application/json;charset=utf-8')
        .set('Authorization', 'Basic ' + new Buffer('any:' + mailchimpApiKey ).toString('base64'))
        .send({
        })
}

var deleteUser = function(client_id)
{
  request
    .delete('https://' + mailchimpInstance + '.api.mailchimp.com/3.0/lists/' + listUniqueId + '/members/' + client_id)
    .set('Content-Type', 'application/json;charset=utf-8')
        .set('Authorization', 'Basic ' + new Buffer('any:' + mailchimpApiKey ).toString('base64'))
        .send({
        }).end(function(err, response) {

        })
}
/*** End of MailChimp

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

app.put('/api/users/:email', function(req, res, next)
{
  console.log(req.body)
  User.update({email: req.params.email}, {$set: req.body}, function(err, user) {
    if (err) return next(err)
    console.log(user)
  })
})

app.put('/api/products/:sku', function(req, res, next)
{
  console.log("Product to Update", req.body)
  Product.update({sku: req.params.sku}, {$set: req.body}, function(err, product) {
    if (err) return next(err)
    console.log(product)
  })
})

app.get('/api/products', function(req, res, next)
{
  Product.find({}, function(err, products)
  {
    res.send(products)
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

app.post('/checkout', function(req, res, next)
{
  console.log(req.body)
  sendReceipt(req.body)
  res.redirect('/thanks')
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