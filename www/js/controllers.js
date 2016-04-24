/* global angular, document, window */
'use strict';

angular.module('starter.controllers', ['ngCordova'])

.controller('AppCtrl', function($scope) {
    // Form data for the login modal
    $scope.loginData = {};
    $scope.isExpanded = false;
    $scope.hasHeaderFabLeft = false;
    $scope.hasHeaderFabRight = false;

    var navIcons = document.getElementsByClassName('ion-navicon');
    for (var i = 0; i < navIcons.length; i++) {
        navIcons.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    }

    ////////////////////////////////////////
    // Layout Methods
    ////////////////////////////////////////

    $scope.hideNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'none';
    };

    $scope.showNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'block';
    };

    $scope.noHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }
    };

    $scope.setExpanded = function(bool) {
        $scope.isExpanded = bool;
    };

    $scope.setHeaderFab = function(location) {
        var hasHeaderFabLeft = false;
        var hasHeaderFabRight = false;

        switch (location) {
            case 'left':
                hasHeaderFabLeft = true;
                break;
            case 'right':
                hasHeaderFabRight = true;
                break;
        }

        $scope.hasHeaderFabLeft = hasHeaderFabLeft;
        $scope.hasHeaderFabRight = hasHeaderFabRight;
    };

    $scope.hasHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (!content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }

    };

    $scope.hideHeader = function() {
        $scope.hideNavBar();
        $scope.noHeader();
    };

    $scope.showHeader = function() {
        $scope.showNavBar();
        $scope.hasHeader();
    };

    $scope.clearFabs = function() {
        var fabs = document.getElementsByClassName('button-fab');
        if (fabs.length && fabs.length > 1) {
            fabs[0].remove();
        }
    };
})

.controller('LoginCtrl', function($scope, $timeout, $state, $stateParams, $q, $ionicLoading, ionicMaterialInk) {
    $scope.$parent.clearFabs();
    $timeout(function() {
        $scope.$parent.hideHeader();
    }, 0);
    ionicMaterialInk.displayEffect();

    var fbLoginSuccess = function(response) {
    if (!response.authResponse){
      fbLoginError("Cannot find the authResponse");
      return;
    }

    var authResponse = response.authResponse;

    getFacebookProfileInfo(authResponse)
    .then(function(profileInfo) {
      // For the purpose of this example I will store user data on local storage
      var user1 = {
        authResponse: authResponse,
				userID: profileInfo.id,
				name: profileInfo.name,
				email: profileInfo.email,
        picture : "http://graph.facebook.com/" + authResponse.userID + "/picture?type=large"
      };
      console.log(user1);
      $ionicLoading.hide();
      $state.go('app.stories');
    }, function(fail){
      // Fail get profile info
      console.log('profile info fail', fail);
    });
  };

  // This is the fail callback from the login method
  var fbLoginError = function(error){
    console.log('fbLoginError', error);
    $ionicLoading.hide();
  };

  // This method is to get the user profile info from the facebook api
  var getFacebookProfileInfo = function (authResponse) {
    var info = $q.defer();

    facebookConnectPlugin.api('/me?fields=email,name&access_token=' + authResponse.accessToken, null,
      function (response) {
				console.log(response);
        info.resolve(response);
      },
      function (response) {
				console.log(response);
        info.reject(response);
      }
    );
    return info.promise;
  };

  //This method is executed when the user press the "Login with facebook" button
  $scope.facebookSignIn = function() {
    facebookConnectPlugin.getLoginStatus(function(success){
      if(success.status === 'connected'){
        // The user is logged in and has authenticated your app, and response.authResponse supplies
        // the user's ID, a valid access token, a signed request, and the time the access token
        // and signed request each expire
        console.log('getLoginStatus', success.status);

    		// Check if we have our user saved
    		var user = {
          authResponse: success.authResponse
        };

    		if(!user.userID){
					getFacebookProfileInfo(success.authResponse)
					.then(function(profileInfo) {
						// For the purpose of this example I will store user data on local storage
            var user1 = {
							authResponse: success.authResponse,
							userID: profileInfo.id,
							name: profileInfo.name,
							email: profileInfo.email,
							picture : "http://graph.facebook.com/" + success.authResponse.userID + "/picture?type=large"
						};
            console.log(user1);

						$state.go('app.stories');
					}, function(fail){
						// Fail get profile info
						console.log('profile info fail', fail);
					});
				}else{
					$state.go('app.stories');
				}
      } else {
        // If (success.status === 'not_authorized') the user is logged in to Facebook,
				// but has not authenticated your app
        // Else the person is not logged into Facebook,
				// so we're not sure if they are logged into this app or not.

				console.log('getLoginStatus', success.status);

				$ionicLoading.show({
          template: 'Logging in...'
        });

				// Ask the permissions you need. You can learn more about
				// FB permissions here: https://developers.facebook.com/docs/facebook-login/permissions/v2.4
        facebookConnectPlugin.login(['email', 'public_profile'], fbLoginSuccess, fbLoginError);
      }
    });
  };
})

.controller('FriendsCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.$parent.setHeaderFab('left');

    // Delay expansion
    $timeout(function() {
        $scope.isExpanded = true;
        $scope.$parent.setExpanded(true);
    }, 300);

    // Set Motion
    ionicMaterialMotion.fadeSlideInRight();

    // Set Ink
    ionicMaterialInk.displayEffect();
})

.controller('ProfileCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);

    // Set Motion
    $timeout(function() {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });
    }, 300);

    $timeout(function() {
        ionicMaterialMotion.fadeSlideInRight({
            startVelocity: 3000
        });
    }, 700);

    // Set Ink
    ionicMaterialInk.displayEffect();
})

.controller('locationCtrl', function($scope, $state, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk, $http, $sce) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);

    $scope.trustSrc = function(src) {
      return $sce.trustAsResourceUrl(src);
    };

    var decodeHtml = function(html) {
      var txt = document.createElement("textarea");
      txt.innerHTML = html;
      return txt.value;
    };


    $scope.locationData = {
      "_id": $stateParams.Id,
      "name": "",
      "subTitle": "",
      "description": "",
      "url": "",
      "urlType": "",
      "nextLocationId": "",
      "latitude": "",
      "longitude": "",
    };

    $scope.gotoNextPage = function(){
      $state.go('app.location',{id:$scope.locationData.nextLocationId});
    };

    $scope.gotoStories = function(){
      $state.go('app.stories');
    };

    $http.get('http://52.38.229.124:9000/api/locations/'+$stateParams.id)
        .success(function(data) {
            $scope.locationData = data;
            $scope.locationData.description = decodeHtml($scope.locationData.description);
            console.log($scope.locationData.description);
            // Set Motion
            $timeout(function() {
                ionicMaterialMotion.slideUp({
                    selector: '.slide-up'
                });
            }, 300);

            $timeout(function() {
                ionicMaterialMotion.fadeSlideInRight({
                    startVelocity: 3000
                });
            }, 700);

            // Set Ink
            ionicMaterialInk.displayEffect();
        });
})

.controller('storyOverviewCtrl', function($scope, $state, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk, $http, $sce, $cordovaGeolocation) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);
    $scope.locationIds = [];

    var posOptions = {
      enableHighAccuracy: true,
      timeout: 20000,
      maximumAge: 0
    };

    $scope.trustSrc = function(src) {
      return $sce.trustAsResourceUrl(src);
    };

    $scope.updateLocations = function(){
      $scope.locationIds = [];
      var location;
      for(location in $scope.story.locations){
        $http.get('http://52.38.229.124:9000/api/locations/'+$scope.story.locations[location])
            .success(function(data) {
                $scope.locationIds.push(data._id);
                $scope.locations[data._id] = data;
                $scope.locations[data._id].distance = "N/A";
                $cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {
                  var lat1 = position.coords.latitude;
                  var lon1 = position.coords.longitude;
                  console.log(lat1);
                  console.log(lon1);
                  console.log($scope.locationIds);
                  for(var i=0; i<$scope.locationIds.length;i++) {
                    var lat2 = $scope.locations[$scope.locationIds[i]].latitude;
                    var lon2 = $scope.locations[$scope.locationIds[i]].longitude;
                    console.log($scope.locations[$scope.locationIds[i]].name+" : "+calcCrow(lat1, lon1, lat2, lon2));
                    $scope.locations[$scope.locationIds[i]].distance = Math.round(calcCrow(lat1, lon1, lat2, lon2));
                  }
                });
            });
      }
    };

    function toRad(Value) {
      return Value * Math.PI / 180;
    }

    function calcCrow(lat1, lon1, lat2, lon2) {
      var R = 6371; // km
      var dLat = toRad(lat2-lat1);
      var dLon = toRad(lon2-lon1);
      lat1 = toRad(lat1);
      lat2 = toRad(lat2);
      var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      var d = R * c;
      return d;
    }

    $scope.story = {
      "_id": $stateParams.storyId,
      "name": "",
      "description": "",
      "mapUrl": "",
      "difficulty": "",
      "nextLocationId": "",
      "latitude": "",
      "longitude": "",
      "locations": []
    };

    $scope.gotoNextPage = function(){
      $state.go('app.location',{id:$scope.story.nextLocationId});
    };

    $scope.locations = [];

    $http.get('http://52.38.229.124:9000/api/stories/'+$stateParams.storyId)
        .success(function(data) {
            $scope.story = data;
            $scope.updateLocations();
            console.log(data);

            // Set Motion
            $timeout(function() {
                ionicMaterialMotion.slideUp({
                    selector: '.slide-up'
                });
            }, 300);

            $timeout(function() {
                ionicMaterialMotion.fadeSlideInRight({
                    startVelocity: 3000
                });
            }, 700);

            // Set Ink
            ionicMaterialInk.displayEffect();
        });


})

.controller('StoryCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk, $http,  $cordovaGeolocation) {

  $scope.$parent.showHeader();
  $scope.$parent.clearFabs();
  $scope.isExpanded = true;
  $scope.$parent.setExpanded(false);
  $scope.$parent.setHeaderFab('right');

  $scope.stories = [];

  var posOptions = {
    enableHighAccuracy: true,
    timeout: 20000,
    maximumAge: 0
  };

  function toRad(Value) {
    return Value * Math.PI / 180;
  }

  function calcCrow(lat1, lon1, lat2, lon2) {
    var R = 6371; // km
    var dLat = toRad(lat2-lat1);
    var dLon = toRad(lon2-lon1);
    lat1 = toRad(lat1);
    lat2 = toRad(lat2);
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c;
    return d;
  }

  $http.get('http://52.38.229.124:9000/api/stories/')
      .success(function(data) {
          $scope.stories = data;
          for(var i=0; i<$scope.stories.length;i++) {
            $scope.stories[i].distance = "N/A";
          }
          console.log(data);
          // Activate ink for controller
          ionicMaterialInk.displayEffect();
          $timeout(function() {
              ionicMaterialMotion.fadeSlideIn({
                  selector: '.animate-fade-slide-in .item'
              });
          }, 200);
          $cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {
            var lat1 = position.coords.latitude;
            var lon1 = position.coords.longitude;
            console.log(lat1);
            console.log(lon1);
            for(var i=0; i<$scope.stories.length;i++) {
              var lat2 = $scope.stories[i].latitude;
              var lon2 = $scope.stories[i].longitude;
              console.log($scope.stories[i].name+" : "+calcCrow(lat1, lon1, lat2, lon2));
              $scope.stories[i].distance = Math.round(calcCrow(lat1, lon1, lat2, lon2));
            }
          });
      });

})

.controller('ActivityCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab('right');

    $timeout(function() {
        ionicMaterialMotion.fadeSlideIn({
            selector: '.animate-fade-slide-in .item'
        });
    }, 200);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();
})

.controller('GalleryCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab(false);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();

    ionicMaterialMotion.pushDown({
        selector: '.push-down'
    });
    ionicMaterialMotion.fadeSlideInRight({
        selector: '.animate-fade-slide-in .item'
    });

})

;
