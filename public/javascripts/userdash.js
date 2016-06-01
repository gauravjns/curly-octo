var app= angular.module("myapp",['infinite-scroll', 'angularMoment']).value('THROTTLE_MILLISECONDS', 250);


// Feed Controller
app.controller("feedController", function($scope, $http, $sce, $window, $timeout, Feeds) {
	
	 $scope.feed = new Feeds();
	 $scope.activitypost= function activitypost(postid, remove, type, feedid, votestatus) {       
		 var url = "/forms/activity/?meta=post&redirect=&status=2&extra=0&type="+type+"&metaid="+postid+"&remove="+remove ;
		 console.log(url);  
		 $http.get(url).success( function(response) {
			 console.log( "Updated" );
		 });  
	}
});

//Feed consturctor
app.factory('Feeds', function($http) {
 var Feeds = function() {
   this.items = [];
   this.busy = false;
   this.end = false;
   this.max = 0;
 };

 Feeds.prototype.nextPage = function() {
   if (this.busy || this .end) return;
   this.busy = true;

   var url = "api/feeds/user/?max="+this.max ;
   $http.get(url).success( function(response) {
  	   console.log(url);
  	   console.log(response);
		 var items= response;
		 for (var i = 0; i < items.length; i++) {
	         this.items.push(items[i]);
	       }
		 this.max =  this.items[this.items.length - 1].feedid;
	     this.busy = false;
  	 //console.log(items.length);
	     if (items.length == 0)
	    	 {
	    	 this.end=true;
	    	 console.log("End");
	    	 }
	 }.bind(this));    
 };

 return Feeds;
});

 
 app.controller("articleController", function($scope, $http, $sce, $window, $timeout) {
	 
	 $scope.init = function(userid)
	  {
		 var url = "api/storys/user/"+$scope.userid;
		 $http.get(url).success( function(response) {
			 console.log(response);
			 $scope.names= response;
		 });
		 
		 var url = "api/groups/pluscause/";
		 $http.get(url).success( function(response1) {
			 console.log(response1);
			 $scope.groups= response1;
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
 
 app.controller("notController", function($scope, $http, $sce, $window, $timeout, Reddit) {
	 
	 $scope.reddit = new Reddit();
	 
});
 
//Reddit constructor function to encapsulate HTTP and pagination logic
app.factory('Reddit', function($http) {
  var Reddit = function() {
    this.items = [];
    this.busy = false;
    this.end = false;
    this.after = '';
  };

  Reddit.prototype.nextPage = function() {
    if (this.busy || this .end) return;
    this.busy = true;

    var url = "api/notifications/user/?before="+this.after ;
    $http.get(url).success( function(response) {
   	 //console.log(url);
   	 //console.log(response);
		 var items= response;
		 for (var i = 0; i < items.length; i++) {
	         this.items.push(items[i]);
	       }
		 this.after =  this.items[this.items.length - 1].notid;
	     this.busy = false;
   	 //console.log(items.length);
	     if (items.length == 0)
	    	 {
	    	 this.end=true;
	    	 console.log("End");
	    	 }
	 }.bind(this));    
  };

  return Reddit;
});
 

 
 app.controller("campController", function($scope, $http, $sce, $window, $timeout) {
	 
	 $scope.init = function(userid)
	  {
		 var url = "api/groups/panel/camp";
		 $http.get(url).success( function(response) {
			 console.log(response);
			 $scope.camppanel= response;
		 });
	  }; 
});
 
 app.controller("orgController", function($scope, $http, $sce, $window, $timeout) {
	 
	 $scope.init = function(userid)
	  {
		 var url = "api/groups/panel/ngo";
		 $http.get(url).success( function(response) {
			 $scope.ngopanel= response;
		 });
		 
		 var url = "api/groups/panel/nss";
		 $http.get(url).success( function(response) {
			 $scope.nsspanel= response;
		 });
	  }; 
});

 
 app.controller("followController", function($scope, $http, $sce, $window, $timeout) {
	 
	 $scope.init = function(userid)
	  {
		 var url = "/api/follow/user/";
		 $http.get(url).success( function(response) {
			 console.log(response);
			 $scope.names= response;
		 });
		 
		 var url = "/api/following/user/";
		 $http.get(url).success( function(response) {
			 console.log(response);
			 $scope.following= response;
		 });
		 
		 var url = "/api/follow/ngo/";
		 $http.get(url).success( function(response) {
			 console.log(response);
			 $scope.ngo= response;
		 });
		 
		 var url = "/api/follow/nss/";
		 $http.get(url).success( function(response) {
			 console.log(response);
			 $scope.nss= response;
		 });
		 
		 var url = "/api/follow/cause/";
		 $http.get(url).success( function(response) {
			 console.log(response);
			 $scope.cause= response;
		 });
		 
		 var url = "/api/follow/volunteering/";
		 $http.get(url).success( function(response) {
			 console.log(response);
			 $scope.volunteering= response;
		 });
		 
		 var url = "/api/follow/intern/";
		 $http.get(url).success( function(response) {
			 console.log(response);
			 $scope.intern= response;
		 });
		 
		 var url = "/api/follow/event/";
		 $http.get(url).success( function(response) {
			 console.log(response);
			 $scope.event= response;
		 });
		 
		 
	  }; 
});
 
 
 var mod;mod=angular.module("infinite-scroll",[]),mod.directive("infiniteScroll",["$rootScope","$window","$timeout",function(i,n,e){return{link:function(t,l,o){var r,c,f,a;return n=angular.element(n),f=0,null!=o.infiniteScrollDistance&&t.$watch(o.infiniteScrollDistance,function(i){return f=parseInt(i,10)}),a=!0,r=!1,null!=o.infiniteScrollDisabled&&t.$watch(o.infiniteScrollDisabled,function(i){return a=!i,a&&r?(r=!1,c()):void 0}),c=function(){var e,c,u,d;return d=n.height()+n.scrollTop(),e=l.offset().top+l.height(),c=e-d,u=n.height()*f>=c,u&&a?i.$$phase?t.$eval(o.infiniteScroll):t.$apply(o.infiniteScroll):u?r=!0:void 0},n.on("scroll",c),t.$on("$destroy",function(){return n.off("scroll",c)}),e(function(){return o.infiniteScrollImmediateCheck?t.$eval(o.infiniteScrollImmediateCheck)?c():void 0:c()},0)}}}]);