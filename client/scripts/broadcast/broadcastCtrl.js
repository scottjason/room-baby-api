'use strict';

angular.module('Broadcast')
  .controller('BroadcastCtrl', BroadcastCtrl);

function BroadcastCtrl($scope, $rootScope, $state, $timeout, $window, BroadcastApi, localStorageService) {
  var ctrl = this;
  $scope.connectionCount = 0;

  var broadcastContainer = document.getElementById('broadcast-container');
  var opts = {
    Animator: {
      duration: 500,
      easing: 'swing'
    },
    bigFixedRatio: false
  };
  var layout = TB.initLayoutContainer(broadcastContainer, opts).layout;

  $window.onresize = function() {
    var resizeCams = function() {
      layout();
    }
    $timeout(resizeCams, 20);
  };

  $scope.$watch('connectionCount', function() {
    if ($scope.connectionCount !== 1) {
      $timeout(function() {
        $scope.viewers = 'there are ' + $scope.connectionCount + ' viewers watching';
      });
    } else {
      $timeout(function() {
        $scope.viewers = 'there is ' + $scope.connectionCount + ' viewer watching';
      });
    }
  });



  this.initialize = function() {
    var broadcastId = $state.params.broadcast_id;
    BroadcastApi.get(broadcastId).then(function(response) {
      if (response.status === 200) {
        localStorageService.set('broadcast', response.data);
        var isPublisher = (response.data.connectCount === 1) || localStorageService.get('isPublisher');
        if (isPublisher) {
          localStorageService.set('isPublisher', true);
          ctrl.startBroadcast(response.data);
        } else {
          ctrl.joinBroadcast(response.data);
        }
      }
    }, function(err) {
      console.log(err);
    });
  };

  this.openShareDialog = function() {
    FB.ui({
      method: 'feed',
      link: $window.location.href,
      picture: 'https://raw.githubusercontent.com/scottjason/room-baby-videos-api/master/views/img/rb-embed-735-350.png',
      name: "Room Baby Broadcast",
      description: "View Live Stream Now"
    }, function(response) {
      localStorageService.get('hasShared', true);
      console.log(response);
    });
  };

  this.showShareLink = function() {
    return localStorageService.get('isPublisher') && !localStorageService.get('hasShared');
  };

  ctrl.registerEvents = function() {
    $scope.session.on("connectionDestroyed", function() {
      $timeout(function() {
        $scope.connectionCount--
      })
    });

    $scope.session.on("connectionCreated", function(event) {
      $timeout(function() {
        if (event.connection.creationTime < $scope.session.connection.creationTime) {
          $scope.connectionCount++
        } else if (event.connection.creationTime > $scope.session.connection.creationTime) {
          $scope.connectionCount++
        }
      });
    });

    $scope.session.on('sessionDisconnected', function(event) {
      console.log('sessionDisconnected', event);
      var broadcastId = localStorageService.get('broadcast')._id;
      BroadcastApi.remove(broadcastId).then(function(response) {
        $timeout(function() {
          $window.location.href = $window.location.protocol + '//' + $window.location.host + $window.location.pathname;
        });
      }, function(err) {
        $timeout(function() {
          $window.location.href = $window.location.protocol + '//' + $window.location.host + $window.location.pathname;
        });
      });
    });

    $scope.session.on('streamCreated', function(event) {
      var isPublisher = localStorageService.get('isPublisher');
      if (!isPublisher) {
        var subscriberProperties = {
          insertMode: 'replace',
          width: "100%",
          height: "100%"
        };
        var subscriber = $scope.session.subscribe(event.stream,
          'broadcast-container',
          subscriberProperties,
          function(error) {
            if (error) {
              console.log(error);
            } else {
              console.log('Subscriber added.');
            }
          });
      } else {
        console.log('pub stream');
      }
    });
  };

  ctrl.startBroadcast = function(broadcast) {
    $scope.session = OT.initSession(broadcast.key, broadcast.sessionId);
    ctrl.registerEvents();
    $scope.session.connect(broadcast.token, function(err) {
      if (err) {
        console.error('error connecting: ', err.code, err.message);
      } else {
        var pubProps = {
          resolution: '1280x720'
        };
        var pubElem = document.createElement('div');
        var publisher = OT.initPublisher(pubElem, pubProps, function(err) {
          if (err) console.error(err);
          $scope.session.publish(publisher);
          broadcastContainer.appendChild(pubElem);
          layout();
          ctrl.timeLeft();
        });
      }
    });
  };

  ctrl.timeLeft = function() {
    var broadcast = localStorageService.get('broadcast');
    var expiresAt = (broadcast.expiresAt);
    var currentMsUtc = new Date().getTime();
    var msLeft = (expiresAt - currentMsUtc);
    var secondsLeft = (msLeft / 1000);
    var minutesLeft = (secondsLeft / 60);
    secondsLeft = secondsLeft % 60;
    if (minutesLeft < 0 && secondsLeft < 2) {
      ctrl.onExpired();
    } else {
      var timeLeft = Math.floor(minutesLeft) + ' minutes and ' + Math.floor(secondsLeft) + ' seconds left';
      $timeout(function() {
        $scope.timeLeft = timeLeft;
        $timeout(function() {
          ctrl.timeLeft();
        }, 1000);
      });
    }
  };

  ctrl.onExpired = function() {
    $scope.session.disconnect();
  };

  ctrl.joinBroadcast = function(broadcast) {
    $scope.session = OT.initSession(broadcast.key, broadcast.sessionId);
    ctrl.registerEvents();
    $scope.session.connect(broadcast.token, function(err) {
      ctrl.timeLeft();
    });
  };

  BroadcastCtrl.$inject['$scope', '$rootScope', '$state', '$timeout', '$window', 'BroadcastApi', 'localStorageService'];
}
