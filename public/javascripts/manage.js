var app= angular.module("manage", [ 'angularMoment']);

 app.controller("eventController", function($scope, $http, $sce, $window, $timeout) {
	 
	  $scope.init = function(eventid,userid)
	  { 
	    $scope.eventid = eventid;
	    var url = "./api/events/full/"+$scope.eventid;
	     $http.get(url).success( function(response) {
	        $scope.event = response;
	        $scope.event.startdate= new Date (response.events.starttime)
	        $scope.event.enddate= new Date (response.events.endtime)
	        $scope.event.lastdate= new Date (response.events.deadline)
	        $scope.event.required = parseInt(response.events.required, 10);
	        if (response.events.certificate==="yes")
        	    { $scope.event.certificate=true;}
            else 
           		{ $scope.event.certificate= false;}
	        
	        if (response.events.status==="yes")
    	    { $scope.event.status=true;}
            else 
       		{ $scope.event.status= false;}
	        
	        if (response.events.commentstatus==="yes")
    	    { $scope.event.commentstatus=true;}
            else 
       		{ $scope.event.commentstatus= false;}
        
	     });
	  };
	  
     $scope.savestory = function() {
    	 console.log($scope.commentstatus)
    	 if ($scope.commentstatus)
    	   { $scope.story.commentstatus=1;}
           else 
           { $scope.story.commentstatus=2;}
    	 
    	 if ($scope.status)
    	   { $scope.story.status=2;}
         else 
           { $scope.story.status=1;}
  	 
    	 
    	 $http({
        	 method : 'POST',
             url : '/savestory/',	 
             data : $scope.story
         }).then(function successCallback(response) {
        	    //console.log(response);
        	    var text= '<p>Comments : '
    	    	if ($scope.story.commentstatus==2)
    	 		{
    	    		text = text + 'closed <br> Status : ';
    	 		}
        	 	else 
    	 		{
        	 		text = text + 'active <br> Status : ';
    	 		}
        	    if ($scope.story.status==1)
    	 		{
        	    	text = text + 'Draft </p>';
    	 		}
        	    else 
    	 		{
        	    	text = text + 'Active </p>';
    	 		}
        	 	$scope.alerts=$sce.trustAsHtml('');
        	 	$scope.alerts= $sce.trustAsHtml('<div class="col-lg-4 col-lg-offset-4 text-center " style ="position: absolute;z-index: 3;"><div class="alert alert-success alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button>Saved '+response.data.msg+ text+'</div></div>');
        	 	$timeout(function() {
        	 		$scope.alerts=$sce.trustAsHtml('');
	        	}, 1500);
         	  }, function errorCallback(response) {
        		  console.log($scope.story)  
        	  });
        	  }
 });
 
 