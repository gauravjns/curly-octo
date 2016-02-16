 angular.module("myapp", [])
 
 .controller("storyController", function($scope, $http, $sce, $window, $timeout) {
	 
	  $scope.init = function(id,userid)
	  { 
	    $scope.storyid = id;
	    var url = "./story/"+$scope.storyid;
	     $http.get(url).success( function(response) {
	        $scope.story = response;
	        $scope.url= '/'+ response.url+ '.story';
	        $scope.time= 'Saved 34 min ago' ;
	        $scope.parent= 'Helpiez Sangthan' ;
	        
	        if (userid!=$scope.story.authorid)
	        {
	        	$scope.alerts= $sce.trustAsHtml('<div class="col-lg-4 col-lg-offset-4 text-center " style ="position: absolute;z-index: 3;"><div class="alert alert-danger alert-dismissible" role="alert">Something went wrong !!! Redirecting .... </div></div>');	
	        	$timeout(function() {
	        		$window.location.href="./";
	        	}, 1000);
	        }
	       
	     });
	  };
	  
     $scope.savestory = function() {
    	 if ($scope.commentstatus)
             $scope.story.commentstatus=1;
           else 
             $scope.story.commentstatus=2;
    	 
    	 $http({
        	 method : 'POST',
             url : '/savestory/',	 
             data : $scope.story
         }).then(function successCallback(response) {
        	    console.log(response);
        	 	$scope.alerts= $sce.trustAsHtml('<div class="col-lg-4 col-lg-offset-4 text-center " style ="position: absolute;z-index: 3;"><div class="alert alert-success alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button>Successfully '+response.data.ss+'</div></div>');
        	  }, function errorCallback(response) {
        		  console.log($scope.story)  
        	  });
        	  }
 });