'use strict';

/* Controllers */

var phonecatControllers = angular.module('phonecatControllers', []);

phonecatControllers.controller('PhoneListCtrl', ['$scope', 'Phone',
  function($scope, Phone) {
  
	$scope.phoneToAdd = {
	    name : '',
		snippet : '',
	    id : '',
		age : '',
		imageUrl : "img/phones/motorola-atrix-4g.0.jpg"
	};
	
	$scope.listRefresh = function() {
	    $scope.phones = Phone.query();
	}
	
	/* Defines a new "hidden" property for each phone and sets to FALSE */
	$scope.initHidden = function() {
	    for (var initPhone = 0; initPhone < $scope.phones.length; initPhone++)
		{
		    $scope.phones[initPhone].hidden = "false";
		}
	}
	
	/* Routine to SET hidden property to TRUE for given phone */
	/* Is there a built-in function instead of linear searching? */
	$scope.ngHidePhone = function(phoneId) {
	    for (var curPhone = 0; curPhone < $scope.phones.length; curPhone++)
		{
		    if ($scope.phones[curPhone].id === phoneId)
			{
			    $scope.phones[curPhone].hidden = "true";
			}
		}
	}
	
	/* Routine to DELETE phone from array of phones */
	/* Again, linear searching ... */
	$scope.hidePhone = function(phoneId) {
	    for (var curPhone = 0; curPhone < $scope.phones.length; curPhone++)
		{
		    if ($scope.phones[curPhone].id === phoneId)
			{
			    $scope.phones.splice(curPhone, 1);
			}
		}
	}
	
	/* Routine to ADD a phone to END of array */
	$scope.addPhone = function()
	{
	    var lastAge = $scope.phones.length - 1;
		
		var tempPhone = {};
		tempPhone.name = $scope.phoneToAdd.name;
		tempPhone.snippet = $scope.phoneToAdd.snippet;
		tempPhone.imageUrl = $scope.phoneToAdd.imageUrl;
		tempPhone.id = $scope.phoneToAdd.id;
		
		$scope.phones.push(tempPhone);
	}
	
	//Initialization
	$scope.listRefresh();
	$scope.initHidden();
	$scope.orderProp = 'age';
  }]).directive('displayPhoneList', function() {
    return {
        restrict : 'E',
		scope : {
			data : '=', // Bi-directional
			moreData : '='
		},
		templateUrl : 'partials/phone-list-UL.html'
    };	
  });

phonecatControllers.controller('PhoneDetailCtrl', ['$scope', '$routeParams', 'Phone',
  function($scope, $routeParams, Phone) {
    $scope.phone = Phone.get({phoneId: $routeParams.phoneId}, function(phone) {
      $scope.mainImageUrl = phone.images[0];
    });

    $scope.setImage = function(imageUrl) {
      $scope.mainImageUrl = imageUrl;
    }
  }]);
