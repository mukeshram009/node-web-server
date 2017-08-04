const express = require('express');
const hbs = require('hbs');
const fs = require('fs');


const port = process.env.PORT || 3000;
var app = express();

 hbs.registerPartials(__dirname +'/views/partials');//this method also needs exact path.
 hbs.registerHelper('currentYear',() => {
   return new Date().getFullYear() //js syntax method to get year
 });
 hbs.registerHelper('screamIt',(text) =>{
   return text.toUpperCase();
 });
 app.set('view engine', 'hbs');
 //app.set() lets you configure various express related configurations.


 app.use((req, res, next) => { //if no called next() will not go to next to execute code ever
   var now = new Date().toString();
   var log = `${now}: ${req.method} ${req.url}`;
   console.log(log);
   fs.appendFile('server.log',log + '\n',(error) => { //to add log to a file server.log
     if(error){
     console.log('unable to append file to server.log');
     }
   });
   next();

 });
//code for maintenance means not called next here in this app.use() code.
 // app.use((req, res, next) => {
 //   res.render('maintenance.hbs');
 // });


 app.use(express.static(__dirname + '/public'));//app.use is how we register middleware.
 //this app.use() code serves files in the folder directly. type folder name after 3000.


 app.get('/', (req, res) => { //render() renders the template you set up with view engine
  res.render('home.hbs',{ //2nd arg. obj to inject the data dynamically.
    pageTitle: 'Home page',
    welcomeMessage: 'Hai welcome to the website'
  });
 });

 app.get('/about', (req, res) => {
   //render() renders the template you set up with view engine
   res.render('about.hbs',{ //2nd arg. obj to inject the data dynamically.
     pageTitle: 'About page'
   });
 });

 app.get('/bad', (req, res) => {
   res.send({
     erroMessage : 'unable to handle request'
   });
 });

 app.use('/projects',(req, res) => {
    res.render('projects.hbs', {
      pageTitle: 'Projects',
      welcomeMessage: 'welcome to the projects page'
    });
 });

app.listen(port,() => {
  console.log(`server is up on port ${port}`);
}); //app.listen() binding our app to port in our machine.
