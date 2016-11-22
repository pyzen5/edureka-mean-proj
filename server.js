var chalk = require('chalk');
var express = require('express');
var mongoose=require('mongoose');
var db=require('./models/db.js');
var employee=require('./routes/employee.js');

var bodyParser = require('body-parser');
var session=require('express-session');

var app = express();

app.use(express.static(__dirname+'/portal'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));


app.get('/employee',employee.viewall);

app.post('/employee',employee.addEmployee);

app.get('/employee/:id',employee.getEmployee);

app.delete('/employee/:id',employee.deleteEmployee);

app.put('/employee/:id',employee.updateEmployee);

var PORT = process.env.PORT || 3000;
app.listen(3000,function(){
    console.log('server started at port '+PORT);
});