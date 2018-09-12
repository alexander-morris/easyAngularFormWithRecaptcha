console.log('loaded ');
// index.js -> bundle.js
// var QRCode = require('qrcode')

// Checkcaptcha submits the API call only as a byproduct of the captcha call but you can swap in any calls you want


angular.module('reportManager', ['vcRecaptcha'])
.controller('reportCtrl',[ '$http', '$scope', '$window', function( $http, $scope, $window ){

	$scope.server = "http://localhost:8887/";

	//  
	$scope.init = function () {


		$scope.supportedCurrencies = [{
			"name":"BTC"
		},{
			"name":"ETH"
		}];
		console.log($scope.supportedCurrencies);

		$scope.display = [
			"",
			"hidden",
			"hidden",
			"hidden",
			"hidden",
			"hidden",
			"hidden",
			"hidden"
		];
	};

	// Pagination Controls
	$scope.next = function (stepId, callBackTest) {
		console.log('next triggered');
		// console.log(stepId, callBackTest)
		// console.log(callBackTest)
		if (callBackTest) {
			console.log('testing with ' + callBackTest)
			callBackTest( function(result) {
				if (true === result) {
					proceed (stepId)
				} else {
					$scope.error = result.error
				}
			});
		} else {
			proceed (stepId)
		}

	}

	$scope.back = function (stepId) {
		hide(stepId - 1);
		show(stepId - 2);
	}

	$scope.SubmitReport = function (callback) {
		console.log('SubmitReport Triggered');

		// This callback continues the form cycle
		callback()
	}

    $scope.checkCaptcha = function (cb) {

    	var payload = {};

		// console.log('testing captcha');
		payload.response = $scope.response;
		
	  // Load the view-data from the node.js server
	  	$http.post( $scope.server + 'checkCaptcha/', payload)
	  		.then(function(response) { 
  			  $scope.address = response.data.address
	          // console.log(response.data.address);
	          initCanvas(response.data.address);
	          cb(true);      	
	        }). 
	        catch(function(error) { 
	          // console.log(error);
	          cb(false);
	        }); 

    }

	// Recaptcha Logic
    $scope.setResponse = function (response) {
        console.info('Response available');
        $scope.response = response;
    };
    $scope.setWidgetId = function (widgetId) {
        console.info('Created widget ID: %s', widgetId);
        $scope.widgetId = widgetId;
    };
    $scope.cbExpiration = function() {
        console.info('Captcha expired. Resetting response object');
        vcRecaptchaService.reload($scope.widgetId);
        $scope.response = null;
     };

}]);