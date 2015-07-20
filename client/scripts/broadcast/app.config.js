'use strict';

angular.module('Broadcast')
  .config(function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, localStorageServiceProvider) {


    $stateProvider
      .state('landing', {
        url: '/:broadcast_id',
        templateUrl: '../views/broadcast.html',
        controller: 'BroadcastCtrl as broadcastCtrl'
      })


    localStorageServiceProvider
      .setPrefix('Broadcast')
      .setNotify(true, true)

    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
  });