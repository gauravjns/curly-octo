var app= angular.module("myapp", [ 'angularMoment']);

 app.controller("storyController", function($scope, $http, $sce, $window, $timeout) {
	 
	  $scope.init = function(id,userid)
	  { 
	    $scope.storyid = id;
	    var url = "./api/story/"+$scope.storyid;
	     $http.get(url).success( function(response) {
	        $scope.story = response;
	        $scope.url= '/'+ response.url+ '.story';
	        $scope.time= '34 min ago' ;
	        $http.get("./api/groups/"+$scope.story.groupid).success( function(response1) {
		    	 $scope.group = response1;
		     });
	        if ($scope.story.status==1)
        		{ $scope.statustext="Draft";
        		$scope.status=false;
        		}
	        if ($scope.story.status==2)
            	{ $scope.statustext= "LIVE";
            		$scope.status=true;	
            	}
	        
	        if ($scope.story.commentstatus==1)
	        	{ $scope.commentstatus=true;}
	           else 
	           { $scope.commentstatus= false;}
	        
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
 
 app.directive('ckEditor', function() {
	  return {
	    require: '?ngModel',
	    link: function(scope, elm, attr, ngModel) {
	      var ck = CKEDITOR.replace(elm[0]);

	      if (!ngModel) return;

	      ck.on('pasteState', function() {
	        scope.$apply(function() {
	          ngModel.$setViewValue(ck.getData());
	        });
	      });

	      ngModel.$render = function(value) {
	        ck.setData(ngModel.$viewValue);
	      };
	    }
	  };
	});