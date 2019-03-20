const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next)=>{
  var now = new Date().toString();
  var log = `Now: ${now} ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err)=>{
    console.log('Error');
  });
  next();
})

app.use((req, res, next)=>{
  res.render('maintenance.hbs');
});

app.get('/about', (req, res)=>{
  res.render('about.hbs', {
    pageTitle: 'About Page',
    currentYear: new Date().getFullYear()
  });
})

app.get('/', (req, res)=>{
  res.render('about.hbs', {
    pageTitle: 'Home Page',
    currentYear: new Date().getFullYear(),
    welcomeMsg: 'Welcome to this Website!'
  });
});

app.get('/json', (req, res)=>{
  res.send({
    name: 'Aditya Prakash',
    likes: [
      'philosophy', 'reading', 'thinking'
    ]
  });
});

app.get('/bad', (req, res)=>{
  res.send({
    errorMessage: 'Unable to fulfill that request.'
  });
});

app.listen(port, ()=>{
  console.log(`Server is up on port ${port}`);
});
