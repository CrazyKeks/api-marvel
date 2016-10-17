var marvelApi = angular.module('marvelApi', ['angular-md5','ui.bootstrap','ui.router']);

	marvelApi.config(function($stateProvider, $urlRouterProvider) {
	    
	    $urlRouterProvider.otherwise('/home');
	    
	    $stateProvider
	        
	        // HOME STATES AND NESTED VIEWS ========================================
	        .state('info', {
	            url: '/info',
	            templateUrl: 'info.html',
	            controller: 'marvel'
	        })
	        	        
	});



 marvelApi.controller('marvel', function($scope, $location, $http, md5) {
 	$scope.name = "";
 	$scope.img = "";
 	$scope.jpg = "";
 	 $scope.characters=[];
 	 $scope.name='';
 	 $scope.img='';
 	 $scope.page = 1;

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
		
		$scope.characterInfo = function(name,img, jpg) {
					$scope.name = name;
					$scope.img = img;
					$scope.jpg = jpg;
 	             	console.log(name);
	             	console.log(img+'.'+jpg);
	             }


       })






