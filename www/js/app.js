// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ionic-material', 'ionMdInput', 'ngCordova'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

    // Turn off caching for demo simplicity's sake
    $ionicConfigProvider.views.maxCache(0);

    /*
    // Turn off back button text
    $ionicConfigProvider.backButton.previousTitleText(false);
    */

    $stateProvider.state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
    })

    .state('app.activity', {
        url: '/activity',
        views: {
            'menuContent': {
                templateUrl: 'templates/activity.html',
                controller: 'ActivityCtrl'
            },
            'fabContent': {
                template: '<button id="fab-activity" class="button button-fab button-fab-top-right expanded button-energized-900 flap"><i class="icon ion-paper-airplane"></i></button>',
                controller: function ($timeout) {
                    $timeout(function () {
                        document.getElementById('fab-activity').classList.toggle('on');
                    }, 200);
                }
            }
        }
    })

    .state('app.friends', {
        url: '/friends',
        views: {
            'menuContent': {
                templateUrl: 'templates/friends.html',
                controller: 'FriendsCtrl'
            },
            'fabContent': {
                template: '<button id="fab-friends" class="button button-fab button-fab-top-left expanded button-energized-900 spin"><i class="icon ion-chatbubbles"></i></button>',
                controller: function ($timeout) {
                    $timeout(function () {
                        document.getElementById('fab-friends').classList.toggle('on');
                    }, 900);
                }
            }
        }
    })

    .state('app.stories', {
        url: '/stories',
        views: {
            'menuContent': {
                templateUrl: 'templates/stories.html',
                controller: 'StoryCtrl'
            }
        }
    })

    .state('app.gallery', {
        url: '/gallery',
        views: {
            'menuContent': {
                templateUrl: 'templates/gallery.html',
                controller: 'GalleryCtrl'
            },
            'fabContent': {
                template: '<button id="fab-gallery" class="button button-fab button-fab-botto-right expanded button-energized-900 drop"><i class="icon ion-heart"></i></button>',
                controller: function ($timeout) {
                    $timeout(function () {
                        document.getElementById('fab-gallery').classList.toggle('on');
                    }, 600);
                }
            }
        }
    })

    .state('app.login', {
        url: '/login',
        views: {
            'menuContent': {
                templateUrl: 'templates/login.html',
                controller: 'LoginCtrl'
            },
            'fabContent': {
                template: ''
            }
        }
    })

    .state('app.studentGuide', {
        url: '/studentGuide',
        views: {
            'menuContent': {
                templateUrl: 'templates/studentGuide.html',
                controller: 'ProfileCtrl'
            },
            'fabContent': {
                template: '<button id="fab-profile" ui-sref="app.studentGuideTSU" class="button button-fab button-fab-bottom-right expanded button-energized-900 spin"><i class="icon ion-chevron-right"></i></button>',
                controller: function ($timeout) {
                  $timeout(function () {
                      document.getElementById('fab-profile').classList.toggle('on');
                  }, 600);
                }
            }
        }
    })

    .state('app.storyOverview', {
        url: '/storyOverview/:storyId',
        views: {
            'menuContent': {
                templateUrl: 'templates/storyOverview.html',
                controller: 'storyOverviewCtrl'
            }
        }
    })

    .state('app.location', {
        url: '/location/:id',
        views: {
            'menuContent': {
                templateUrl: 'templates/location.html',
                controller: 'locationCtrl'
            }
        }
    })

    .state('app.studentGuideHunt', {
        url: '/studentGuideHunt',
        views: {
            'menuContent': {
                templateUrl: 'templates/studentGuide-hunt.html',
                controller: 'ProfileCtrl'
            },
            'fabContent': {
                template: '<button id="fab-profile" ui-sref="app.studentGuide" class="button button-fab button-fab-bottom-right expanded button-energized-900 spin"><i class="icon ion-chevron-left"></i></button>',
                controller: function ($timeout) {
                  $timeout(function () {
                      document.getElementById('fab-profile').classList.toggle('on');
                  }, 600);
                }
            }
        }
    })

    .state('app.studentGuideSHC', {
        url: '/studentGuideSHC',
        views: {
            'menuContent': {
                templateUrl: 'templates/studentGuide-SHC.html',
                controller: 'ProfileCtrl'
            },
            'fabContent': {
                template: '<button id="fab-profile" ui-sref="app.studentGuideMBT" class="button button-fab button-fab-bottom-right expanded button-energized-900 spin"><i class="icon ion-chevron-right"></i></button>',
                controller: function ($timeout) {
                  $timeout(function () {
                      document.getElementById('fab-profile').classList.toggle('on');
                  }, 600);
                }
            }
        }
    })

    .state('app.studentGuideTSU', {
        url: '/studentGuideTSU',
        views: {
            'menuContent': {
                templateUrl: 'templates/studentGuide-TSU.html',
                controller: 'ProfileCtrl'
            },
            'fabContent': {
                template: '<button id="fab-profile" ui-sref="app.studentGuideSHC" class="button button-fab button-fab-bottom-right expanded button-energized-900 spin"><i class="icon ion-chevron-right"></i></button>',
                controller: function ($timeout) {
                  $timeout(function () {
                      document.getElementById('fab-profile').classList.toggle('on');
                  }, 600);
                }
            }
        }
    })

    .state('app.studentGuideMBT', {
        url: '/studentGuideMBT',
        views: {
            'menuContent': {
                templateUrl: 'templates/studentGuide-MBT.html',
                controller: 'ProfileCtrl'
            },
            'fabContent': {
                template: '<button id="fab-profile" ui-sref="app.studentGuideHunt" class="button button-fab button-fab-bottom-right expanded button-energized-900 spin"><i class="icon ion-chevron-right"></i></button>',
                controller: function ($timeout) {
                  $timeout(function () {
                      document.getElementById('fab-profile').classList.toggle('on');
                  }, 600);
                }
            }
        }
    })

    .state('app.beerGuide', {
        url: '/beerGuide',
        views: {
            'menuContent': {
                templateUrl: 'templates/beerGuide.html',
                controller: 'ProfileCtrl'
            },
            'fabContent': {
                template: '',
                controller: function ($timeout) {
                    $timeout(function () {
                        document.getElementById('fab-friends').classList.toggle('on');
                    }, 900);
                }
            }
        }
    })

    .state('app.theDowntown5', {
        url: '/theDowntown5',
        views: {
            'menuContent': {
                templateUrl: 'templates/theDowntown5.html',
                controller: 'ProfileCtrl'
            },
            'fabContent': {
                template: '<button id="fab-profile" ui-sref="app.theDowntown5CrankArm" class="button button-fab button-fab-bottom-right expanded button-energized-900 spin"><i class="icon ion-chevron-right"></i></button>',
                controller: function ($timeout) {
                  $timeout(function () {
                      document.getElementById('fab-profile').classList.toggle('on');
                  }, 600);
                }
            }
        }
    })

    .state('app.theDowntown5CrankArm', {
        url: '/theDowntown5CrankArm',
        views: {
            'menuContent': {
                templateUrl: 'templates/theDowntown5CrankArm.html',
                controller: 'ProfileCtrl'
            },
            'fabContent': {
                template: '<button id="fab-profile" ui-sref="app.theDowntown5Tasty" class="button button-fab button-fab-bottom-right expanded button-energized-900 spin"><i class="icon ion-chevron-right"></i></button>',
                controller: function ($timeout) {
                  $timeout(function () {
                      document.getElementById('fab-profile').classList.toggle('on');
                  }, 600);
                }
            }
        }
    })

    .state('app.theDowntown5Tasty', {
        url: '/theDowntown5Tasty',
        views: {
            'menuContent': {
                templateUrl: 'templates/theDowntown5Tasty.html',
                controller: 'ProfileCtrl'
            },
            'fabContent': {
                template: '<button id="fab-profile" ui-sref="app.theDowntown5ThePit" class="button button-fab button-fab-bottom-right expanded button-energized-900 spin"><i class="icon ion-chevron-right"></i></button>',
                controller: function ($timeout) {
                  $timeout(function () {
                      document.getElementById('fab-profile').classList.toggle('on');
                  }, 600);
                }
            }
        }
    })

    .state('app.theDowntown5ThePit', {
        url: '/theDowntown5Pit',
        views: {
            'menuContent': {
                templateUrl: 'templates/theDowntown5ThePit.html',
                controller: 'ProfileCtrl'
            },
            'fabContent': {
                template: '<button id="fab-profile" ui-sref="app.theDowntown5Trophy" class="button button-fab button-fab-bottom-right expanded button-energized-900 spin"><i class="icon ion-chevron-right"></i></button>',
                controller: function ($timeout) {
                  $timeout(function () {
                      document.getElementById('fab-profile').classList.toggle('on');
                  }, 600);
                }
            }
        }
    })

    .state('app.theDowntown5Trophy', {
        url: '/theDowntown5Trophy',
        views: {
            'menuContent': {
                templateUrl: 'templates/theDowntown5Trophy.html',
                controller: 'ProfileCtrl'
            },
            'fabContent': {
                template: '<button id="fab-profile" ui-sref="app.theDowntown5State" class="button button-fab button-fab-bottom-right expanded button-energized-900 spin"><i class="icon ion-chevron-right"></i></button>',
                controller: function ($timeout) {
                  $timeout(function () {
                      document.getElementById('fab-profile').classList.toggle('on');
                  }, 600);
                }
            }
        }
    })

    .state('app.theDowntown5State', {
        url: '/theDowntown5State',
        views: {
            'menuContent': {
                templateUrl: 'templates/theDowntown5State.html',
                controller: 'ProfileCtrl'
            },
            'fabContent': {
                template: '<button id="fab-profile" ui-sref="app.theDowntown5" class="button button-fab button-fab-bottom-right expanded button-energized-900 spin"><i class="icon ion-chevron-left"></i></button>',
                controller: function ($timeout) {
                  $timeout(function () {
                      document.getElementById('fab-profile').classList.toggle('on');
                  }, 600);
                }
            }
        }
    })

    .state('app.profile', {
        url: '/profile',
        views: {
            'menuContent': {
                templateUrl: 'templates/profile.html',
                controller: 'ProfileCtrl'
            },
            'fabContent': {
                template: '<button id="fab-profile" class="button button-fab button-fab-bottom-right button-energized-900"><i class="icon ion-plus"></i></button>',
                controller: function ($timeout) {
                    /*$timeout(function () {
                        document.getElementById('fab-profile').classList.toggle('on');
                    }, 800);*/
                }
            }
        }
    })
    ;

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/login');
});
