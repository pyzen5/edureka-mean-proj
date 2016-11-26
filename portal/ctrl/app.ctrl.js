var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {    
    
     $scope.isFormInvalid = false;
     $scope.getAge = getAge;
     
    function getAge(dateString) 
    {    
      var today = new Date();
      var birthDate = new Date($scope.employee.dob);
      var age = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
      {
        age--;
      }
      $scope.employee.age = age;
    }
  var updateView=function(){
         $http.get('/employee').success(function(response) {
         $scope.employees = response; 
         $scope.employee="";
        });
  };

  updateView();
  
    $scope.addEmployee = function() {
      if(angular.isDefined($scope.employee.name) && angular.isDefined($scope.employee.email) &&
        angular.isDefined($scope.employee.dob) && angular.isDefined($scope.employee.gender) &&
        angular.isDefined($scope.employee.department) && angular.isDefined($scope.employee.age)){
          $http.post('/employee', $scope.employee).success(function(response) {
            $scope.isFormInvalid = false;
            updateView();
          });
      }
      else
      {
        $scope.isFormInvalid = true;
      }     
    };
    
    $scope.removeEmployee = function(id) {
      $http.delete('/employee/' + id).success(function(response) {
          updateView();
      });
    };
    
    $scope.editEmployee = function(id) {
      $http.get('/employee/' + id).success(function(response) {
      $scope.employee = response;
     });
   };
    
    $scope.updateEmployee = function() {
      if(angular.isDefined($scope.employee.name) && angular.isDefined($scope.employee.email) &&
        angular.isDefined($scope.employee.dob) && angular.isDefined($scope.employee.gender) &&
        angular.isDefined($scope.employee.department) && angular.isDefined($scope.employee.age)){          
          $scope.isFormInvalid = false;
          $http.put('/employee/' + $scope.employee._id, $scope.employee).success(function(response) {
            updateView();
          });
        }
        else{
              $scope.isFormInvalid = true;
        }
     
    };
    

}]);




