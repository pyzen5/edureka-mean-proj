var chalk = require('chalk');
var mongoose = require( 'mongoose' );

var dbURI = 'mongodb://localhost/test';


//var dbURI = 'mongodb://your_username:your_password@ds043615.mongolab.com:43615/leavethemarks';


mongoose.connect(dbURI);


mongoose.connection.on('connected', function () {
  console.log(chalk.yellow('Mongoose connected to ' + dbURI));
});

mongoose.connection.on('error',function (err) {
  console.log(chalk.red('Mongoose connection error: ' + err));
});

mongoose.connection.on('disconnected', function () {
  console.log(chalk.red('Mongoose disconnected'));
});

// Stories Schema

var employeeSchema = new mongoose.Schema({
  name:String,
  email: String,
  dob:Date,
  department:String,
  gender: String,
  age:String
});

// Build the Employee model

mongoose.model( 'Employee', employeeSchema);
