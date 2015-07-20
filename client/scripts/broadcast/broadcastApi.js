angular.module('Broadcast')
  .factory('BroadcastApi', function($http) {

    'use strict'

    function get(broadcastId) {
      var request = $http({
        method: 'GET',
        url: '/get-broadcast/' + broadcastId
      });
      return (request.then(successHandler, errorHandler));
    }

    function successHandler(response) {
      return (response);
    }

    function errorHandler(response) {
      return (response);
    }

    return ({
      get: get,
    });
    BroadcastApi.$inject('$http');
  });