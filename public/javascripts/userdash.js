var app= angular.module("myapp", ['angularMoment']);

 app.controller("articleController", function($scope, $http, $sce, $window, $timeout) {
	 
	 $scope.init = function(userid)
	  {
		 var url = "api/storys/user/"+$scope.userid;
		 $http.get(url).success( function(response) {
			 console.log(response);
			 $scope.names= response;
		 });
	  }; 
});
 
 app.controller("eventController", function($scope, $http, $sce, $window, $timeout) {
	 
	 $scope.init = function(userid)
	  {
		 var url = "api/events/user/"+$scope.userid;
		 $http.get(url).success( function(response) {
			 console.log(response);
			 $scope.names= response;
		 });
	  }; 
});
 
 app.controller("notController", function($scope, $http, $sce, $window, $timeout) {
	 
	 $scope.init = function(userid)
	  {
		 var url = "api/notifications/user/"+$scope.userid;
		 $http.get(url).success( function(response) {
			 console.log(response);
			 $scope.names= response;
		 });
	  }; 
});