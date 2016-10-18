var marvelApi = angular.module('marvelApi', ['angular-md5','ui.bootstrap','ui.router']);

	marvelApi.config(function($stateProvider, $urlRouterProvider) {
	    
	    $urlRouterProvider.otherwise('/');
	    
	    $stateProvider
	       	
       		.state('home', {
	            url: "/home",
	            templateUrl: 'start.html',
	            controller: 'marvel'
	         
	        })
	        
	        .state('info', {
	            url: "/info/:id",
	            templateUrl: 'info.html',
	            controller: 'marvelInfo'
	         
	        })
	        	        
	});



 marvelApi.controller('marvel', function($scope, $location, $http, md5, $stateParams) {
 	 $scope.characters=[];
 	 $scope.page = 1;
 	 


 	 console.log( $stateParams.id);
 	 $scope.getCharacters = function(val) {

 	       $scope.charName= "";
 	       $scope.timeStamp=  Date.now();
 	       $scope.publicKey="6b570a4f30c77f6280c0521ed75cfb94";
 	       $scope.privatKey="35792de2a5e56fb2892f5c34f9c4d1ac4207c14b";

 	       baseUrl= "http://gateway.marvel.com/v1/public/characters";

	           return $http.get(baseUrl, {
	             params: {
	               nameStartsWith: val,
	               limit: 100,
	               ts: $scope.timeStamp,
	               apikey: $scope.publicKey,
	               hash: md5.createHash($scope.timeStamp + $scope.privatKey + $scope.publicKey || '')
	           }
	             }).success(function(responce) {
	             	console.log(responce);
 					 $scope.characters = responce.data.results;
			       })

	             $scope.displayItems = $scope.characters.slice(0, 5);
	             
	             $scope.pageChanged = function() {
	               var startPos = ($scope.page - 1) * 5;
	               console.log($scope.page);
	             }

	             

       }
		


       })



	marvelApi.controller('marvelInfo', function($scope, $location, $http, md5, $stateParams) {

		$scope.info=[];

		$scope.infoCharacters = function() {

			console.log($stateParams.id);		
					
			$scope.timeStamp=  Date.now();
			$scope.publicKey="6b570a4f30c77f6280c0521ed75cfb94";
			$scope.privatKey="35792de2a5e56fb2892f5c34f9c4d1ac4207c14b";

			baseUrl= "http://gateway.marvel.com/v1/public/characters/"+$stateParams.id;
			console.log(baseUrl);	
				 return $http.get(baseUrl, {
	             params: {
	               ts: $scope.timeStamp,
	               apikey: $scope.publicKey,
	               hash: md5.createHash($scope.timeStamp + $scope.privatKey + $scope.publicKey || '')
	           }
	             }).success(function(responce) {
	             	console.log(responce);
 					 $scope.info = responce.data.results[0];
			       })



	             }

		


	})




