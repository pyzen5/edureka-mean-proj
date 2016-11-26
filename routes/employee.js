var mongoose = require('mongoose');
var Employee = mongoose.model('Employee');


exports.stories=function(req,res){
             Story.find({}, function(err,stories){
                  res.render('home',{stories:stories,session:req.session});
              });
}

exports.viewall = function(req,res){
    Employee.find({}, function(err,employees){
                  res.status(200).send(employees);
              });
}
exports.addEmployee=function(req,res){
   var name=req.body.name;
   var email=req.body.email;
   var dob=req.body.dob;
   var department=req.body.department;
   var gender =req.body.gender;
   var age =req.body.age; 

   var newEmployee=new Employee();
   newEmployee.name=name;
   newEmployee.email=email;
   newEmployee.dob=dob;
   newEmployee.department=department;
   newEmployee.gender=gender;
   newEmployee.age=age;

   newEmployee.save(function(err,savedEmployee){
       if(err){
         console.log("Error : While saving the story");
         return res.status(500).send();
       }else{
         res.redirect("/employee");
       }
   });
}


exports.getEmployee=function(req,res){
   var employeeId=req.params.id;
   Employee.findOne({_id:employeeId}, function(err,employee){
           res.status(200).send(employee);
        });
}

exports.deleteEmployee=function(req,res){
   var employeeId=req.params.id;
   Employee.remove({_id:employeeId}, function (err) {
       if (err) return handleError(err);
       res.status(200).send();
    });   
}

exports.updateEmployee=function(req,res){
   var employeeId=req.params.id;
   var name=req.body.name;
   var email=req.body.email;
   var dob=req.body.dob;
   var department=req.body.department;
   var gender =req.body.gender;
   var age =req.body.age;
  

   Employee.update({_id:employeeId}, { $set: {name:name,email:email,dob:dob,department:department,gender:gender,age:age} }, { multi: true }, function (err) {
       if (err) return handleError(err);
       res.status(200).send();
    });
  }


exports.saveComment=function(req,res){
   var story_slug=req.params.slug;
   var comment=req.body.comment;
   var posted_date=new Date();

   Story.findOne({slug:story_slug}, function(err,story){

               story.comments.push({body:comment,commented_by:req.session.username,date:posted_date});

               story.save(function(err,savedStory){
                   if(err){
                     console.log("Error : While saving comments");
                     return res.status(500).send();
                   }else{
                     res.render('story',{story:story,session:req.session});
                   }
               });

        });
 }
